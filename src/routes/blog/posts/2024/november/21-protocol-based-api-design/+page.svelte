<script lang="ts">
  import Python from '@app/prism/python.svelte'
  import Note from '@blog/note.svelte'
  import Quote from '@blog/quote.svelte'
</script>

<p>
  I've gone through a journey with static typing, starting from thinking static types were
  the programming equivalent of unnecessary bureaucracy to thinking it's insane to write
  any code without having some kind of type checker!
</p>

<p>
  My appreciation for a type checker started when I learnt how to write Scala and then
  cemented when I spent five years writing Go for LIFX. Around 2022 I started to figure
  out how to use mypy and what it looks like to take my style of Python and formalise how
  everything fits together. From the start of 2023 I've had a few sprints where I tried to
  push the limits of mypy and I'm gonna use this post to explain the approaches I've
  currently landed on.
</p>

<Note>
  This post is around 5000 words excluding code examples, the read time for this post may
  be around 40 minutes.
</Note>

<h2>What is a typing.Protocol?</h2>

<p>
  Python’s static type checking is an interesting thing cause it’s effectively glorified
  comments that can be understood by a linter, for an extremely dynamic interpreted
  language.
</p>

<p>
  I’ve been writing Python nonstop for over 15 years at this point (and for a large period
  of that I really mean an unhealthy type of nonstop) and I learnt how to use the language
  without types. What I’ve found as I learn to adapt my style to including these type
  annotations is a lot of what I did to make code reliable at runtime was the same things
  the type system formalises.
</p>

<p>
  The <mark>typing.Protocol</mark> provided to us is a way to declare the shape of some object.
  For those familiar with Go, they're like an Interface in that language, but with some more
  capability.
</p>

<p>
  For example, if I want to represent an object that has at least a
  <mark>blah</mark> method:
</p>

<Python
  source={`
from typing import Protocol


class Thing(Protocol):
    def blah(self) -> None: ...
`}
/>

<Note>
  In this case those three dots are valid Python syntax and lets us define a function with
  an empty body. Protocols in Python are purely a static time concept and so by definition
  lack an implementation, which is why all methods on a protocol should be empty (so
  either a doc comment, or those three dots)
</Note>

<p>
  And like Go interfaces (and unlike java interfaces) I don’t need to explicitly declare
  when an object satisfies this interface.
</p>

<Python
  source={`
import dataclasses


class One:
    def blah(self) -> None:
        print("one")


class Two:
    def blah(self) -> None:
        print("two")

    def other(self) -> int:
        print("three")


@dataclasses.dataclass
class Three:
    option: str

    def blah(self, arg1: int = 1) -> None:
        print(self.option)
`}
/>

<p>
  In all of these cases if I had something that takes in a <mark>Thing</mark> I can use an instance
  of those objects to satisfy that interface
</p>

<Python
  source={`
def takes_thing(thing: Thing) -> None:
    thing.blah()


takes_thing(One())
takes_thing(Two())
takes_thing(Three(option="three"))
`}
/>

<p>
  In all of these cases what’s important is that there is a <mark>blah</mark> method that can
  be called without passing anything in and a None value is returned. What that method does
  or where it gets other input from isn’t relevant.
</p>

<p>
  This gets even more interesting with the "dunder" methods. Especially the ability to
  represent a callable object
</p>

<Python
  source={`
class MyCallable(Protocol):
    def __call__(self, val: str, /) -> str: ...
`}
/>

<p>There are multiple ways to satisfy this</p>

<Python
  source={`
import functools


def _with_def_syntax(val: str) -> str:
    return val


with_def_syntax: MyCallable = _with_def_syntax

as_a_lambda: MyCallable = lambda val: "hi"


# This function by itself doesn't satisfy the protocol
def _function_taking_more(val: str, times: int) -> str:
    return val * times


# But we can curry it to make it satisfy "MyCallable"
with_currying: MyCallable = functools.partial(_function_taking_more, times=10)


def _function_taking_more_with_defaults(val: str, times: int = 10) -> str:
    return val * times


all_extra_params_have_defaults: MyCallable = _function_taking_more_with_defaults


class ACallable:
    def __call__(val: str) -> str:
        return f"You gave me this value! '{val}'"


# It's the instance of "ACallable" that satisfies the interface
as_an_object: MyCallable = ACallable()
`}
/>

<Note>
  Note <mark>_with_def_syntax</mark> doesn't have the slash in the signature but it still satisfies
  the interface, because not having the slash means there are more ways to call this method
  rather than less. If it was the other way round then the implementation would have less functionality
  than the protocol and the type checker would complain.
</Note>

<h2>Represent class constructors as a separate protocol</h2>

<p>
  A pattern that is less obvious but very powerful is the idea that the constructor of an
  object is it's own separate protocol
</p>

<Python
  source={`
from typing import Protocol


class Thing(Protocol):
    def answer(self) -> int: ...


class ThingMaker(Protocol):
    def __call__(self) -> Thing: ...
`}
/>

<p>
  The idea is that a constructor (specifically <mark>__init__</mark> in the Python language)
  is an implementation detail for creating an object rather than an intrinsic part of that object.
</p>

<p>
  The reason this is useful is the same reason Java has multiple constructors. It lets us
  represent what the object is and needs separately from how we satisfy those needs.
</p>

<p>
  Python does not have multiple constructors but we do have class methods and they work
  perfectly well for this purpose
</p>

<Python
  source={`
import dataclasses
from collections.abc import Sequence
from typing import Protocol, Self


class Stuff(Protocol):
    numbers: Sequence[int]


class StuffMaker(Protocol):
    def __call__(self, *, start: int, end: int) -> Stuff: ...


@dataclasses.dataclass
class MyStuff:
    numbers: Sequence[int]

    @classmethod
    def create_from_range(cls, *, start: int, end: int) -> Self:
        return cls(numbers=list(range(start, end)))
`}
/>

<p>
  In this example there is a protocol that represents the shape for some object, a
  protocol that represents the ability to create that object from two integers, and a
  single implementation that satisfies both protocols.
</p>

<p>Whereas a more "straightforward" implementation may instead do</p>

<Python
  source={`
import dataclasses
from collections.abc import Sequence
from typing import Protocol, Self


class Stuff(Protocol):
    numbers: Sequence[int]

    def __init__(self, *, start: int, end: int) -> Self: ...


class MyStuffWithOperationInConstructor:
    def __init__(self, *, start: int, end: int) -> None:
        self.numbers = list(range(start, end))


@dataclasses.dataclass(frozen=True)
class MyStuffWithDynamicNumbersAttribute:
    start: int
    end: int

    @property
    def numbers(self) -> list[int]:
        return list(range(self.start, self.end))
`}
/>

<p>There are three properties of this design that I believe is less than ideal</p>
<ul>
  <li>
    <p>
      In <mark>MyStuffWithOperationInConstructor</mark> we are creating an object with an
      <mark>__init__</mark> method that throws away what it receives
    </p>
  </li>
  <li>
    <p>
      The <mark>numbers</mark> attribute on such an object will either be dynamic when it
      should be static, or the <mark>__init__</mark> method needs to perform some calculations
      to set the value for it.
    </p>
  </li>
  <li>
    <p>
      When writing stub implementations of <mark>Stuff</mark> for tests, I have to know and
      care about the objects use to construct this object in deployed environments that I otherwise
      may not care about in that test (i.e. unnecessary coupling with implementation details).
    </p>
  </li>
</ul>

<p>The separation of concern here is separating what I want from how to get it.</p>

<Note>
  The important thing isn’t the type annotations, but rather using the annotations to
  guide thinking about data and logic flow.
  <strong> The annotations are a tool rather than a goal. </strong>
  If the annotations are awkward, it’s the linter trying to communicate that something about
  that flow is awkward.
</Note>

<h2>Confirming something satisfies an interface</h2>

<p>
  It’s very useful that we don’t have to explicitly declare that an object implements an
  interface, but it still can be useful to make mypy confirm that’s true when we make
  something specifically to implement an interface (having a choice is about the
  opportunity to do something just as much as it's about the opportunity to not do that
  something)
</p>

<p>
  There isn’t a purpose built way to do this in mypy but there is a trick that I find most
  people have a negative knee jerk reaction to, followed by trying to suggest
  alternatives, and then finally landing on acceptance:
</p>

<Python
  source={`
import dataclasses
from typing import TYPE_CHECKING, Protocol, cast


class Want(Protocol):
    def __call__(self) -> bool: ...


@dataclasses.dataclass(frozen=True)
class MyFirstCallable:
    answer: bool

    def __call__(self) -> bool:
        return self.answer


class MySecondCallable:
    def __call__(self) -> bool:
        return False


MyThirdCallable = lambda: True

###############################################
## The interesting part starts here::

if TYPE_CHECKING:
    _MFC: Want = cast(MyFirstCallable, None)
    _MSC: Want = cast(MySecondCallable, None)
    _MTC: Want = MyThirdCallable
`}
/>

<Note>
  Note that this is purely a technique for making mypy give us more useful errors closer
  to where we are explicitly trying to implement a protocol. There is no loss of
  functionality by not doing this, but it does produce better notices from mypy when an
  implementation made specifically to satisfy a protocol no longer satisfies that
  protocol.
</Note>

<p>There are several parts to this <mark>if TYPE_CEHCKING</mark> block:</p>

<ul class="tight-list">
  <li><p>The if condition</p></li>
  <li><p>The naming scheme</p></li>
  <li><p>The cast</p></li>
  <li><p>What mypy sees</p></li>
</ul>

<p>
  So first, that if condition. This says only look at this code at static time.
  Effectively this means this code is never executed. It is only ever statically analyzed.
  This isn’t strictly necessary but as python is an interpreted language, it brings the
  neglible runtime risk to zero including the risk that modules external to this one start
  depending on those objects at runtime, and tells other humans these words are explicitly
  only for the type checker
</p>

<p>
  The naming scheme I use here makes it such that each variable is prefixed with an
  underscore and is the name of the variable we are checking as an acronym. The idea is
  that in python the same name cannot be given different types and so we want a different
  name for each object we are checking but we don’t actually care what that name is. I
  tend to find most of the time an acronym will be unique enough that extra letters aren’t
  required.
</p>

<p>
  That cast is possibly the strangest part. It does make perfect sense though, I promise!
</p>

<p>
  In Python the cast lets us tell mypy to think that we have an object here whose type is
  an instance of the first argument. At runtime this function returns that second argument
  without any processing and nothing changes. But at static time mypy will believe the
  value here has that declared type. So in this case we have the <mark>None</mark> value
  but mypy believes us that this value actually is an instance of the type we passed into
  <mark>cast</mark>. As a general rule I’m not a fan of cast and I think it’s easy to use
  it to create code that isn’t type safe, but it’s perfect for this situation.
</p>

<p>So in effect, when we say</p>

<Python source={`_MFC: Want = cast(A, None)`} />

<p>
  Mypy will interpret this as saying we have a variable that has type
  <mark>Want</mark>
  and we are assigning to it an instance of <mark>A</mark> This is useful because if A
  does not in fact satisfy <mark>Want</mark> then mypy will complain at us about that!
  (the point of a linter is to complain when things don’t match our expectations). Also if
  creating an instance of a class requires passing in inputs, as is the case with
  <mark>MyFirstCallable</mark>, those requirements can effectively be ignored as they
  aren't relevant to what this check is for.
</p>

<Note>
  I'm gonna repeat this several times to make sure it sinks in, but the
  <strong> type checker is a static linter and does not interpret the code. </strong> It does
  the same checks in this block that it does everywhere else, but we're taking a shortcut here
  because we don't also need to make the code do something useful at runtime.
</Note>

<p>When a developer is new to mypy it’s tempting to instead do this</p>

<Python source={`_MFC: type[Want] = A`} />

<p>
  However this gives really poor errors cause, whilst the following description isn't
  technically true, mypy effectively sees this:
</p>

<Python source={`_MFC: Callable[[] Want] = Callable[[], A]`} />

<p>
  And mypy doesn't give the same level of detail when comparing the values inside a
  generic (<mark>Callable</mark> is a generic container).
</p>

<p>Also, I'll draw some attention to that last example:</p>
<Python
  source={`
from typing import TYPE_CHECKING, Protocol


class Want(Protocol):
    def __call__(self) -> bool: ...


MyThirdCallable = lambda: True

if TYPE_CHECKING:
    _MTC: Want = MyThirdCallable
`}
/>

<p>
  We don't need the same <mark>cast</mark> trick here because
  <mark>MyThirdCallable</mark> is already an object that satisfies the protocol.
</p>

<p>
  For completeness, the examples in the previous section about splitting the shape of the
  object from the construction of that object, I'd write:
</p>

<Python
  source={`
if TYPE_CHECKING:
    _S: Stuff = cast(MyStuff, None)
    _SC: StuffMaker = MyStuff.create_from_range
`}
/>

<h2>Generics</h2>

<p>
  I find the patterns above to be useful when generics aren’t involved, but they become
  especially useful when generics are involved. Especially when mypy strict mode is used
  (which I recommend, it makes it a lot more obvious when mypy isn't complaining because
  it's comparing against <mark>Any</mark> types)
</p>

<p>I’ll expand on what I mean further down, but first:</p>

<h2>The runtime_checkable decorator doesn’t do what it looks like it’s doing</h2>

<p>
  I want to dive into the difference between an <mark>abc</mark> class and a protocol. On the
  surface it appears they do the same thing and can be used for the same purpose. I’m here to
  tell you that’s not always the case!
</p>

<p>
  In short, Protocol classes are the contract for what is available on an API whereas abc
  classes are a contract for how to provide an API. There is a 1:n relationship between a
  protocol and an abc class (and potentially vice verca). And more importantly they serve
  different audiences.
</p>

<Note>
  For those unfamiliar with this "abc" class, it's a
  <a href="https://docs.python.org/3/library/abc.html"> standard library in Python </a>
  for creating <strong>A</strong>bstract <strong>B</strong>ase
  <strong>C</strong>lasses and the two main features it gives us are

  <ul>
    <li>
      <p>
        The ability to mark specific methods as abstract such that subclasses cannot be
        instantiated if they don't have an implementation for those methods
      </p>
    </li>
    <li>
      <p>
        The ability to register non inherited classes as a member of that abc, so that the
        abc can be used in an <mark>isinstance</mark> check against the abstract class
      </p>
    </li>
  </ul>

  <p>
    For the purposes of my argument, any standard non protocol class can be the base class
    for the implementation, but for brevity I will keep referring to any such class as an
    "abc" class.
  </p>
</Note>

<p>
  This is relevant to a conversation about protocols because sometimes you need to do
  checks at runtime to know what shape an object is. And it’s really tempting to do the
  following:
</p>

<Python
  source={`
from typing import Protocol, runtime_checkable


@runtime_checkable
class MyProtocol(Protocol):
    val: str

    def process(self) -> bool: ...


def do_something(o: object) -> bool:
    if isinstance(o, MyProtocol):
        return o.process()
`}
/>

<p>
  The problem however is that <mark>runtime_checkable</mark> only checks that names exist
  on the object.
  <strong>It does not check that those attributes are the correct type</strong> (and fundamentally
  can’t do that kind of check at runtime, especially when generics are involved)
</p>

<p>
  It’s certainly safe to do that kind of check on known abc classes though. Here’s an
  example that’s easy to (incorrectly) dismiss as verbose and repetitive.
</p>

<Python
  source={`
import abc
from typing import TYPE_CHECKING, Protocol, cast


class Thing(Protocol):
    @property
    def val(self) -> str: ...

    def process(self) -> bool: ...


class ThingBase(abc.ABC):
    @property
    @abc.abstractmethod
    def val(self) -> str: ...

    @abc.abstractmethod
    def process(self) -> bool: ...


def takes_my_protocol(o: Thing) -> bool:
    return o.process()


def do_something(o: object) -> bool:
    if isinstance(o, ThingBase):
        return takes_my_protocol(o)


if TYPE_CHECKING:
    # Note that the point of the liskov violation rules is that if the base class
    # satisfies the protocol, then all subclasses will also satisfy the protocol.
    _TB: Thing = cast(ThingBase, None)
`}
/>

<p>
  The downside is the code that does this kind of check does need to have known base
  classes that satisfy the protocol but I’d argue the situations where we’ve dynamically
  created some object that can be anything should be limited and part of that contract is
  saying it should be implemented in terms of some specific class (Protocol classes aren't
  "real" in the same way other classes are).
</p>

<p>
  The reason this makes sense even without the type checker is that static analysis does
  not care about run time values.
</p>

<p>It’s an important concept that does need to be repeated</p>

<Quote>Values are a run time concept and are irrelevant to the type checker.</Quote>

<p>
  So when we have a value that only exists at runtime, we can’t represent it only in terms
  of type checking concepts. We must first represent it as a concrete runtime object (in
  this case a subclass of some specific non protocol class) before we can then represent
  it in terms of a static time concept.
</p>

<p>
  So on my comment about this being verbose. I’ve come to the conclusion that making an
  abc for every protocol is indeed verbose and unecessary, but there are definitely places
  where it’s useful and necessary.
</p>

<p>
  For example on a Django project using
  <a
    href="https://docs.djangoproject.com/en/5.1/ref/utils/#django.utils.module_loading.import_string"
  >
    import_string
  </a> on some string you found on django settings. The return of that could be literally anything.
  And so we need a way to assert the type of that value matches what is expected.
</p>

<p>
  The pattern that I have landed on around this is to set an expectation that what is
  found will be treated as a callable object and we care about the type of whatever we get
  from invoking that object.
</p>

<Python
  source={`
from django.conf import settings
from django.utils.module_loading import import_string


def get_some_instance() -> MyProtocol:
    constructor = import_string(settings.SOME_CLASS)
    instance = constructor()
    assert isinstance(instance, SomeKnownABC)
    return instance
`}
/>

<p>
  If having known abc classes feels like an unnecessary restriction, remember that a
  Protocol is a static time concept rather than a run time concept.
</p>

<Note
  >I think it's an anti-pattern to instead check that we've imported a specific class type
  like the following for the same reasons that it's a good idea to split the shape of an
  object from how that object is created.

  <Python
    source={`
from django.conf import settings
from django.utils.module_loading import import_string


def get_some_instance() -> MyProtocol:
    constructor = import_string(settings.SOME_CLASS)
    # anti-pattern!!!! Don't do this
    # instead prefer isinstance on what is returned from calling the constructor
    # so that we aren't creating an unecessary implementation restriction.
    assert issubclass(constructor, SomeKnownABC)
    return constructor()
`}
  />
</Note>

<p>
  If you have a situation where you need to pass something in to that callable, then we
  have the same problem where we need to first assert a value is some concrete type before
  we can do anything with any kind of type safety. The pattern I advocate for is to expect
  an intermediary:
</p>

<Python
  source={`
import abc
from typing import Protocol

from django.conf import settings
from django.utils.module_loading import import_string


class Want(Protocol):
    info: str

    def process() -> int: ...


# yes, this is the factory pattern!
class WantMaker(abc.ABC):
    @abc.abstractmethod
    def make(info: str) -> Want: ...


def get_some_instance(info: str) -> Want:
    constructor = import_string(settings.SOME_CLASS)
    maker = constructor()
    assert isinstance(maker, WantMaker)
    return maker.make(info)
`}
/>

<p>
  In all cases the idea is that what we get from <mark>import_string</mark> should always be
  treated as a callable that receives no arguments and either returns the thing we want, or
  the ability to make the thing we want given some extra runtime information.
</p>

<Note>
  The reason we want to call what we get from <mark>import_string</mark> is because without
  some interesting code (which I've written at work in some nice test helpers at for this mechanism)
  it will always return something at the top level of a module. So making sure it's a callable
  means that we have the capacity to avoid import time side effects and have the control to
  ensure specific operations only happen after everything else has been loaded.
</Note>

<h2>Generics</h2>

<p>
  Things are pretty simple until we start to add generics, and whilst it's certainly
  manageable, it is a bit less simple and straight forward. Personally I see that as an
  education problem, same as every programming concept in any language. Some concepts
  require more effort to take on than others, but it can be easy sometimes to mistake
  unfamiliarity as complexity.
</p>

<p>
  The main difficulty when it comes to generics in mypy is we don't have "higher kinded
  type vars", which prevents the following:
</p>

<Python
  source={`
from typing import Generic, TypeVar

T_Item = TypeVar("T")
T_MyCollection = TypeVar("T_MyCollection", bound="MyCollection")


class MyCollection(Generic[T_Item]):
    # imagine some implementation here
    ...


def add_to_collection(item: T_Item, collection: T_MyCollection[T_Item]) -> None: ...
`}
/>

<p>
  This looks intuitive and I'd certainly love to have that, but <a
    href="https://github.com/python/typing/issues/548">mypy doesn't support it</a
  >
</p>

<p>
  The good news is that what we do want isn’t as restrictive as it first appears. The
  rules I follow are:
</p>

<ul>
  <li><p>Never make a type var from a generic class</p></li>
  <li><p>Make the data generic and the APIs well defined</p></li>
  <li>
    <p>Disconnect what is needed for the API from what is needed to implement the API.</p>
  </li>
  <li><p>Avoid contravariant types</p></li>
</ul>

<h2>Don’t make a typevar from a generic class</h2>

<p>
  This becomes a bit more obvious when you have strict mode turned on as you’ll find mypy
  complains about requiring the type var gets filled in. So for example in the example
  above the type var for the collection is implicitly represented as
</p>

<Python
  source={`
T_MyCollection = TypeVar("T_MyCollection", bound="MyCollection[Any]")
`}
/>

<p>
  So it becomes a question of what to have in place of that <mark>Any</mark>. The problem
  becomes whatever we fill it in with will restrict that type var in a way that cannot be
  further specialised. And it’s inevitable to reach a point where we end up with some code
  that we want to extend such that the Item has some extra method on it and we start
  having to do some dodgy casts to depend on that extra method.
</p>

<Note
  >In mypy <mark>object</mark> and <mark>Any</mark> are both wildcards but
  <mark>object</mark>
  represents no functionality whereas <mark>Any</mark> represents no types, and as a
  general rule avoiding <mark>Any</mark> makes for code that ages less poorly</Note
>

<Python
  source={`
import dataclasses
from collections.abc import Sequence
from typing import Protocol, TypeVar

T_Item = TypeVar("T_Item", bound="Item")
T_Collection = TypeVar("T_Collection", bound="Collection[Item]")


class Item(Protocol):
    a: int


class Collection(Protocol[T_Item]):
    items: Sequence[Item]


@dataclasses.dataclass
class ItemWithMore:
    a: int
    b: str


class MyCollection(Collection[ItemWithMore]):
    items: Sequence[ItemWithMore]


def takes_collection(collection: T_Collection) -> T_Collection:
    # Something happens with the collection here
    return collection


collection = MyCollection(items=[ItemWithMore(a=1, b="two")])
after_doing_something = takes_collection(collection)

first_item = after_doing_something.items[0]
first_item.b  # attr-defined error cause T_Collection is defined in terms of Item
`}
/>

<p>
  This however is less of a problem than it first seems, cause a type var is used to
  represent different API surfaces and isn't necessary to represent different
  implementations for the same API surface. We don't need to use a type var for something
  that has a stable API.
</p>

<Note>
  When I say "stable" API, what I effectively mean is that the available attributes and
  methods on the API, it's inputs, and it's outputs don't change depending on the
  specifics of the implementation
</Note>

<p>
  The example above is a very simple case of the problem but the one change to make the
  types carry through would be to not have the <mark>T_Collection</mark> type var at all:
</p>

<Python
  source={`
def takes_collection(collection: Collection[T_Item]) -> Collection[T_Item]:
    # Something happens with the collection here
    return collection
`}
/>

<p>
  Essentially we want to make it so we are defining a stable API in terms of an unstable
  source of data/logic and then it becomes a case of spending the design effort to make
  sure that the stable API surface is defined by <strong>what</strong>
  is being achieved rather than in terms of <strong>how</strong> it's being achieved.
</p>

<p>
  I recommend <a href="https://www.youtube.com/watch?v=OMPfEXIlTVE"
    >this Sandi Metz talk</a
  > talking about using composition to expand an API surface
</p>

<h2>A side note about variance</h2>

<p>TypeVars have a property to them called "variance", of which there are three types:</p>

<ul class="tight-list">
  <li><p>Invarant</p></li>
  <li><p>Covariant</p></li>
  <li><p>Contravariant</p></li>
</ul>

<p>
  A handy simplification to help understand the difference in variance is that these terms
  relate to how the types used to implement a container affects how different
  implementations can be substituted.
</p>

<p>
  So say we have a container generic called <mark>Container</mark> and it takes a single
  TypeVar, and we have two classes <mark>A</mark>
  and <mark>B</mark>. We want to know if
  <mark>Collection[A]</mark> can be used where a <mark>Collection[B]</mark> is required.
</p>

<p>So say our Collection is defined as</p>

<Python
  source={`
T_Item = TypeVar("T_Item")


class Collection(Protocol[T_Item]): ...
`}
/>

<p>
  In this case <mark>T_Item</mark> is defined as "invariant".
  <mark>T_Item</mark> can be "covariant" if we say instead
</p>

<Python source={`T_CO_Item = TypeVar("T_CO_Item", covarant=True)`} />

<p>Or contravariant if we say</p>

<Python source={`T_COT_Item = TypeVar("T_COT_Item", contravariant=True)`} />

<Note>
  The name has no functional purpose and is irrelevant, but I do name them as "T_XXX",
  "T_CO_XXX" and "T_COT_XXX" to visually disambiguate type vars from other variables. And
  I never use "T" or "U" as doing a find in a document for a single capital "T" is an
  awful experience.
  <p>
    Also, I'm gonna ignore
    <a href="https://peps.python.org/pep-0695/">PEP 695</a> for this blog post.
  </p>
  <p>
    And also there is a section that could be written about what it means to bind a type
    var but I'll instead only mention that in passing later on.
  </p>
</Note>

<p>
  If the type var is contravariant then <mark>Collection[A]</mark> can be used where
  <mark>Collection[B]</mark> is required if <mark>B</mark> is always a subtype of
  <mark>A</mark> (extra API surface is always dropped)
</p>

<p>
  If the type var is covariant then <mark>Collection[A]</mark> can be used where
  <mark>Collection[B]</mark> is required if <mark>A</mark> is always a subtype of
  <mark>B</mark> (extra API surface is always kept)
</p>

<p>An invariant type var is when the other two rules can be violated.</p>

<p>
  Mypy will guide you to using the correct form but essentially if the type var is only
  ever used as an input type then it must be contravariant. If the type var is only ever
  used as an output it must be covariant, otherwise it is invariant.
</p>

<p>
  This is why <mark>Sequence</mark> is covariant, but list is not! Because Sequence is immutable
  whereas list is mutable.
</p>

<p>To show what I mean:</p>

<Python
  source={`
from collections.abc import Sequence
from typing import Protocol, TypeVar

T_CO_Item = TypeVar("T_CO_Item", covariant=True)
T_Item = TypeVar("T_Item")


class ImmutableCollection(Protocol[T_CO_Item]):
    @property
    def items(self) -> Sequence[T_CO_Item]: ...


class MutableCollection(Protocol[T_Item]):
    @property
    def items(self) -> Sequence[T_Item]: ...

    # T_Item used as an input here and output in the items method
    # so it can only be invariant
    def add_item(self, item: T_Item) -> None: ...
`}
/>

<p>
  In our mutable collection, the item is used as an input in
  <mark>add_item</mark> and so mypy will complain at us if we define that type var as covariant.
</p>

<p>
  This is why the following is a liskov violation (mypy doesn't explicitly call this one
  out as violating the liskov substitution principle, but that's what is happening here)
</p>

<Python
  source={`
import dataclasses


class A:
    def hello(self) -> None: ...


class B(A):
    def hi(self) -> None: ...


@dataclasses.dataclass(frozen=True)
class Thing:
    items: list[A]

    def process(self) -> None:
        for item in self.items:
            item.hello()


@dataclasses.dataclass(frozen=True)
class ThingChild(Thing):
    items: list[B]  # liskov violation!

    def process(self) -> None:
        super().process()
        for item in self.items:
            item.hi()
`}
/>

<p>Because say we have a function that takes one of these Thing instances</p>

<Python
  source={`
def processes_thing(thing: Thing) -> None:
    thing.items.append(A())
    thing.process()
`}
/>

<p>
  We should be able to pass an instance of <mark>ThingChild</mark> into this function but
  if we do so we don’t realise in <mark>processes_thing</mark> that we need to append an instance
  of B into the items!
</p>

<p>
  The way to solve this is to make the actions here a part of the explicit public API
  surface:
</p>

<Python
  source={`
import abc
import dataclasses
from collections.abc import MutableSequence
from typing import Generic, Protocol, TypeVar

T_Item = TypeVar("T_Item")


# The public interface doesn't need to be generic!
class Processor(Protocol):
    def add_one(self) -> None: ...
    def process(self) -> None: ...


class A:
    def hello() -> None: ...


class B(A):
    def hi() -> None: ...


# The implementation is generic because the information used
# to satisfy "Processor" likely has an unstable API surface.
class ThingBase(Generic[T_Item], abc.ABC):
    _items: MutableSequence[T_Item]

    @abc.abstractmethod
    def add_one(self) -> None: ...

    @abc.abstractmethod
    def process(self) -> None: ...


@dataclasses.dataclass(frozen=True)
class ThingA(ThingBase[A]):
    _items: list[A]

    def add_one(self) -> None:
        self._items.append(A())

    def process(self) -> None:
        for item in self._items:
            item.hello()


@dataclasses.dataclass(frozen=True)
class ThingB(ThingBase[B]):
    _items: list[B]

    def add_one(self) -> None:
        self._items.append(B())

    def process(self) -> None:
        # Plenty of room for more nuance of the design of this
        # but this post is long enough already!
        ThingA(items=self._items).process()
        for item in self.items:
            item.hi()


def processes_thing(thing: Processor) -> None:
    thing.add_one()
    thing.process()
`}
/>

<p>
  This works because the Processor interface does not care about the how, it only cares
  about the what. So keeping the specifics of the Item as an implementation detail means
  we are able to make an orchestrator (what
  <mark>processes_thing</mark> is) that works for many different implementations without itself
  being defined as generic.
</p>

<Note>
  Note we can pass in a list[B] to the constructor of <mark>ThingA</mark> because input arguments
  are always contravariant, which means extra API surface is ignored rather than remembered.
</Note>

<p>
  Ultimately the behaviour is that inputs are contravariant because the implementation
  will ignore the extra methods and outputs are covariant because the caller expects the
  extra methods. And the game is all about figuring out what happens when we substitute in
  a different implementation.
</p>

<h2>Different data, same functionality</h2>

<p>
  Trying to design an API using protocols first becomes a lot easier when as the developer
  you recognise that what the protocol needs does not need to include everything the
  implementation needs.
</p>

<p>
  Unfortunately this means it does take work to get it right! In the projects I’ve tried
  to do this in I found that the protocols would tell me when parts of the data/logic flow
  had the wrong responsibilities by being awkward to work with. The more I was able to
  make for good coupling and cohesion in the design, the more helpful the protocols
  became. This however is the part that’s hard to sell: the need for a decent level of
  patient design work. Other than patterns that discourage easy-to-avoid foot guns I
  personally don’t have good answers for how to carry out that design work (the way I
  think about API design is highly contextual and difficult for me to generalise).
</p>

<h2>Avoid contravariant type vars</h2>

<p>
  Avoid is perhaps too strong a word, but in general, I find that having a contravariant
  type var can be restrictive in a way that isn't immediately obvious, and I do have a
  pattern that resolves that at the cost of some minor extra boilerplate
</p>

<p>
  As mentioned before, a contravariant type var is used to represent a value where extra
  API surface is always dropped:
</p>

<Python
  source={`
import dataclasses
from typing import TYPE_CHECKING, Protocol, TypeVar, cast

T_COT_Item = TypeVar("T_COT_Item", contravariant=True)


class Recorder(Protocol[T_COT_Item]):
    def record(self, item: T_COT_Item) -> None: ...


@dataclasses.dataclass(frozen=True)
class ItemA:
    a: int


@dataclasses.dataclass(frozen=True)
class ItemB(ItemA):
    b: int


class RecorderA:
    def record(self, item: ItemA) -> None:
        print(item.a)


class RecorderB:
    def record(self, item: ItemB) -> None:
        print(item.a, item.b)


def record_things(recorder: Recorder[ItemA]) -> None:
    recorder.record(ItemA(a=1))


# This fails because Recorder[ItemB] cannot be used where Recorder[ItemA] is required
record_things(RecorderB())

if TYPE_CHECKING:
    _RA: Recorder[ItemA] = cast(RecorderA, None)
    _RB: Recorder[ItemB] = cast(RecorderB, None)
`}
/>

<p>
  The pattern I prefer is to lean into "the only problem layers don't solve is having too
  many layers" and create an intermediary object that is specific to what is being
  operated on. This is a bit of a subtle distinction in this example, but it would look
  like this:
</p>

<Python
  source={`
import dataclasses
from typing import TYPE_CHECKING, Protocol, cast


class Recorder(Protocol):
    def record(self) -> None: ...


@dataclasses.dataclass(frozen=True)
class ItemA:
    a: int


class ItemARecorder:
    item: ItemA

    def record(self) -> None:
        print(self.item.a)


@dataclasses.dataclass(frozen=True)
class ItemB(ItemA):
    b: int


class ItemBRecorder:
    item: ItemB

    def record(self) -> None:
        print(self.item.a, self.item.b)


def record_things(recorder: Recorder) -> None:
    recorder.record()


record_things(ItemARecorder(item=ItemA(a=1)))
record_things(ItemBRecorder(item=ItemB(a=1, b=5)))

if TYPE_CHECKING:
    _RA: Recorder = cast(ItemARecorder, None)
    _RB: Recorder = cast(ItemBRecorder, None)
`}
/>

<p>
  If this is the extent of requirements then it's likely reasonable to only need to have a
  record method directly on the items themselves, but it's easy to imagine a scenario
  where there's a 1:n relationship between item and "recording" functionality and this
  pattern lets us separate the action of this "record" from what that actually means so
  that it's the caller that controls what that means rather than the orchestrator.
</p>

<p>To be more explicit about what the pattern is, when you have this:</p>

<Python
  source={`
from typing import Protocol, TypeVar

T_COT_Item = TypeVar("T_COT_Item", contravariant=True)


class Thing(Protocol[T_COT_Item]):
    def do_something(self, item: T_COT_Item) -> None: ...
`}
/>

<p>To instead have this:</p>

<Python
  source={`
from typing import Protocol, TypeVar

T_Item = TypeVar("T_Item")


class Thing(Protocol[T_Item]):
    item: T_Item

    def do_something(self) -> None: ...
`}
/>

<p>Or this:</p>

<Python
  source={`
from typing import Protocol, TypeVar

T_CO_Item = TypeVar("T_CO_Item", covariant=True)


class Thing(Protocol[T_CO_Item]):
    @property
    def item(self) -> T_CO_Item: ...

    def do_something(self) -> None: ...
`}
/>

<p>
  Such that the changeable API surface being acted on is separate from the signature of
  the function doing the action.
</p>

<Note
  >Note that in both these situations, we are able to represent the two sides of the
  design coin such that the implementation is generic and the usage is not
  <Python
    source={`
import dataclasses
from typing import TYPE_CHECKING, Protocol, TypeVar, cast

T_CO_Item = TypeVar("T_CO_Item", covariant=True)


class ForImplementation(Protocol[T_CO_Item]):
    @property
    def item(self) -> T_CO_Item: ...

    def do_something(self) -> None: ...


class ForUse(Protocol):
    def do_something(self) -> None: ...


@dataclasses.dataclass(frozen=True)
class Implementation:
    item: MyItem

    def do_something(self) -> None:
        self.item.take_over_the_world()


if TYPE_CHECKING:
    _FI: ForImplementation[MyItem] = cast(Implementation, None)
    _FU: ForUse = cast(Implementation, None)
`}
  />
</Note>

<h2>The import_string pattern for generics</h2>

<p>
  The pattern I introduced above to make <mark>import_string</mark> type safe also works really
  well for generics. For example, in comparison to this incorrect implementation:
</p>

<Python
  source={`
from collections.abc import Sequence
from typing import Protocol, TypeVar

from django.conf import settings
from django.utils.module_loading import import_string

T_Item = TypeVar("T_Item")


class Collection(Protocol[T_Item]):
    @property
    def calculate(self) -> Sequence[T_Item]: ...


# There's nothing to bind to T_Item here!
def get_some_instance() -> Collection[T_Item]:
    return import_string(settings.MY_COLLECTION_CLASS)()


class Item:
    pass


def get_some_specific_instance() -> Collection[Item]:
    return import_string(settings.MY_COLLECTION_CLASS)()
`}
/>

<p>
  In both of our getter functions here, there's nothing to confirm that what we're
  returning matches what we've specified. And, even worse, that first one effectively
  returns a shrug emoji!
</p>

<p>
  Let's handle the slightly less straightforward one first,
  <mark>get_some_instance</mark>
</p>

<p>
  First we need to be able to bind that type var. Essentially a type var needs to be
  associated with an input to be bound to something specific. Essentially like simple
  algebra, given "X + 3", substitute in a value for "X" to solve the equation.
</p>

<Python
  source={`
def get_some_instance(item_kls: type[T_Item]) -> Collection[T_Item]:
    return import_string(settings.MY_COLLECTION_CLASS)()
`}
/>

<p>
  And then we can create our intermediary class used to create the final result in a way
  that's type safe:
</p>

<Python
  source={`
import abc
from collections.abc import Sequence
from typing import Generic, Protocol, TypeVar

from django.conf import settings
from django.utils.module_loading import import_string

T_Item = TypeVar("T_Item")


class Collection(Protocol[T_Item]):
    @property
    def calculate(self) -> Sequence[T_Item]: ...


class CollectionMaker(Generic[T_Item], abc.ABC):
    @abc.abstractmethod
    def make(self, item_kls: type[T_Item]) -> Collection[T_Item]: ...


def get_some_instance(item_kls: type[T_Item]) -> Collection[T_Item]:
    constructor = import_string(settings.MY_COLLECTION_CLASS)()
    assert isinstance(constructor, CollectionMaker)
    return constructor.make(item_kls)
`}
/>

<p>
  The other getter might be a little simpler depending on whether our base class is
  generic or not. Easiest case being we have a base class that isn't generic itself:
</p>

<Python
  source={`
import abc
from collections.abc import Sequence
from typing import TYPE_CHECKING, Protocol, TypeVar, cast

from django.conf import settings
from django.utils.module_loading import import_string

T_Item = TypeVar("T_Item")


class Collection(Protocol[T_Item]):
    @property
    def calculate(self) -> Sequence[T_Item]: ...


class Item:
    pass


class SpecificCollection(abc.ABC):
    @abc.abstractmethod
    @property
    def calculate(self) -> Sequence[Item]: ...


def get_some_specific_instance() -> Collection[Item]:
    instance = import_string(settings.MY_COLLECTION_CLASS)()
    assert isinstance(instance, SpecificCollection)
    return instance


if TYPE_CHECKING:
    _SC: Collection[Item] = cast(SpecificCollection, None)
`}
/>

<p>
  Otherwise we can say the expectation is that the setting points to a
  <mark>CollectionMaker</mark>
  and implement our specific getter in terms of the generic getter
</p>

<Python
  source={`
def get_some_specific_instance() -> Collection[Item]:
    return get_some_instance(Item)
`}
/>

<h2>So why not pass around the base classes instead?</h2>

<p>
  When I think about API design, I think of it as the "two sides of the coin" as I've
  mentioned in passing above, where you have the API from the perspective of how it's used
  and the API from the perspective of how it's implemented. And that perspective is
  relative to what/who is using the code rather than relative to the code itself.
</p>

<p>
  In my experience, there generally isn't a 1:1 relationship between the API surface from
  those two perspectives because the user doesn't want to change their code when the
  implementation changes, and different implementations tend to think about the solution
  in different ways.
</p>

<p>
  This means it's possible, and good, to create different abc classes that all satisfy the
  same interface, but prioritise different aspects of how to achieve that interface. This
  means you may have an abc class that already has an implementation for the primary
  interface and requires subclasses to implement a different set of methods to fill in the
  blanks. Whereas a different abc for the same primary interface may do the same but for
  an entirely different set of methods, or indeed only care about the primary interface.
  In all cases, these extra methods are not relevant to the primary interface and the
  caller should not know about them, and the static type checker ain't gonna complain
  about you accessing underscore prefixed attributes, but it will complain about
  attributes that statically aren't available!
</p>

<p>
  There's also the scenario where different parts of the codebase may have different, non
  overlapping needs from the same object. Perhaps one part of the codebase only requires
  an interface for writing data, whereas a different part of the codebase only requires
  reading data. This is especially obvious when you create stub implementations for tests
  and find yourself creating a method that raises <mark>NotImplementedError</mark>
  cause that method is part of the interface, but irrelevant to that part of the code.
</p>

<Quote>
  Using a protocol we are able to specify the API surface we need, without imposing any
  restriction or expectation around what is needed to implement that API surface.
</Quote>

<h2>Namespaces are one honking great idea</h2>

<p>
  Naming is an important thing and I'll quickly give my strong opinion on this as well.
  Say we have these two classes:
</p>

<Python
  source={`
import dataclasses
from typing import Protocol


class Item(Protocol):
    @property
    def a(self) -> int: ...


@dataclasses.dataclass(frozen=True)
class Item:
    a: int
 `}
/>

<p>
  We need a way to differentiate the two. Personally I'm not a fan of doing something like <mark
    >class P_Item</mark
  > and I'd rather keep the protocols as "clean" as possible to make them more natural to use
</p>

<p>
  What I do instead is to prefer a file structure such that my module has a "protocols"
  namespace so whenever I use a protocol it always appears as
  <mark>my_module.protocols.XXX</mark>. So within the same module:
</p>

<Python
  source={`
import dataclasses
from typing import TYPE_CHECKING, cast

from . import protocols


@dataclasses.dataclass(frozen=True)
class Item:
    a: int


if TYPE_CHECKING:
    _I: protocols.Item = cast(Item, None)
`}
/>

<p>And outside of the module:</p>

<Python
  source={`
from my_codebase import my_amazing_code


def takes_item(item: my_amazing_code.protocols.Item) -> int:
    return item.a


def make_item() -> my_amazing_code.protocols.Item:
    return my_amazing_code.items.Item(a=20)
`}
/>

<p>
  This also means I do have one place that defines the API surface that my code wants to
  provide and work with
</p>

<Note
  >To make this work without also explicitly doing a <mark
    >from my_codebase.my_amazing_code import protocols, items</mark
  >
  requires a <mark>__init__.py</mark> for that module that has something like

  <Python
    source={`
from . import protocols, items
`}
  />

  <p>
    Which will work as long as the files within that module don't do an import that
    accesses attributes on the module itself. So this is fine:
  </p>

  <Python
    source={`
# assuming the module has a protocols.py 
from . import protocols
`}
  />

  <p>But within the module, this is not:</p>

  <Python
    source={`
from my_codebase import my_amazing_code

# If this happens at module level while importing the module, then python
# would complain that you're accessing an attribute on a partially imported module
my_amazing_code.protocols
`}
  />
</Note>

<h2>Prefer immutable protocols</h2>

<p>
  One final strong opinion from me is around preferring immutable interfaces. The general
  rule I have here is that if you have an object that requires a transformation after
  instantiation to be complete, then you actually have two objects. One object
  representing the first "wave" of data, and an object that represents the transformation
  of that data.
</p>

<p>
  A great example of this is in a mypy plugin I made for Django projects that requires
  runtime Django introspection to do what it needs to do. I start with information about
  where the project is and what is needed to start it up. I use this <mark>Project</mark>
  object to create a
  <mark>Loaded</mark>
  instance which has all the information from starting up Django, and then I use that to create
  a <mark>Discovered</mark> which has all information that is relevant to my plugin and in a
  format that's easy to work with.
</p>

<p>
  Whereas a more "straight forward" approach would be to have all of this extra
  information that requires an operation be defined as optional values on the <mark
    >Project</mark
  >. By representing these different states as different objects I remove the need to do a
  bunch of
  <mark>is None</mark> checks all over the place to ensure that these optional values have values.
</p>

<Python
  source={`
from __future__ import annotations

import pathlib
from collections.abc import Mapping, Sequence
from typing import NewType, Protocol, Self, TypeVar

from django.apps.registry import Apps
from django.conf import LazySettings

T_Project = TypeVar("T_Project", bound="Project")

ImportPath = NewType("ImportPath", str)
ConcreteModelsMap = Mapping[ImportPath, Sequence["Model"]]


# The real code has more properties, but I'll ignore that here for brevity
class Project(Protocol):
    """
    Represents a Django project to be analyzed
    """

    @property
    def root_dir(self) -> pathlib.Path:
        """
        Where the django project lives
        """

    @property
    def additional_sys_path(self) -> Sequence[str]:
        """
        Any additional paths that need to be added to sys.path
        """

    @property
    def env_vars(self) -> Mapping[str, str]:
        """
        Any additional environment variables needed to setup Django
        """

    def load_project(self) -> Loaded[Self]:
        """
        Do necessary work to load Django into memory
        """


# The real code has more properties, but I'll ignore that here for brevity
class Loaded(Protocol[T_Project]):
    """
    Represents a Django project that has been setup and loaded into memory
    """

    @property
    def project(self) -> T_Project:
        """
        The project that was loaded
        """

    @property
    def settings(self) -> LazySettings:
        """
        The instantiated Django settings object
        """

    @property
    def apps(self) -> Apps:
        """
        The instantiated Django apps registry
        """

    def perform_discovery(self) -> Discovered[T_Project]:
        """
        Perform discovery of important information from the loaded Django project
        """


# The real code has more properties, but I'll ignore that here for brevity
class Discovered(Protocol[T_Project]):
    @property
    def loaded_project(self) -> Loaded[T_Project]:
        """
        The loaded django project that was analyzed
        """

    @property
    def installed_apps(self) -> list[str]:
        """
        The value of the settings.INSTALLED_APPS setting.
        """

    @property
    def concrete_models(self) -> ConcreteModelsMap:
        """
        The map of concrete models key'd by their import path.
        """


# Including this for completeness of the example, but ignoring what's on it for brevity
class Model(Protocol):
    pass
`}
/>

<Note>
  <p>
    Something to notice about this example is that on each protocol class, all the
    attributes are decorated with <mark>@property</mark> which means that they are read
    only. I'd love to instead have something like
    <mark>apps: ReadOnly[Apps]</mark> but mypy does not provide that.
  </p>
  <p>
    I tend to then implement these protocols with frozen
    <mark>dataclasses</mark>
    or frozen <mark>attr</mark> classes.
  </p>
</Note>

<p>And then in that project I use it via this orchestrator class:</p>

<Python
  source={`
import abc
import dataclasses
import pathlib
from typing import Generic

from typing_extensions import Self

from .. import protocols


# Parts of this are removed for brevity
@dataclasses.dataclass(frozen=True, kw_only=True)
class VirtualDependencyHandler(Generic[protocols.T_Project], abc.ABC):
    discovered: protocols.Discovered[protocols.T_Project]

    @classmethod
    def create(cls, *, project_root: pathlib.Path, django_settings_module: str) -> Self:
        return cls(
            discovered=(
                cls.make_project(
                    project_root=project_root,
                    django_settings_module=django_settings_module,
                )
                .load_project()
                .perform_discovery()
            ),
        )

    @classmethod
    @abc.abstractmethod
    def make_project(
        cls, *, project_root: pathlib.Path, django_settings_module: str
    ) -> protocols.T_Project: ...
`}
/>

<p>
  Or if I already have a loaded instance of Django, like I do in the tests for the project
  at work, I can instead start from the <mark>Loaded</mark> class:
</p>

<Python
  source={`
import dataclasses
import pathlib

from extended_mypy_django_plugin import django_analysis
from tools.typechecking.virtual_dependencies import VirtualDependencyHandler

PROJECT_ROOT = pathlib.Path(__file__).parent.parent


def test_querysets_have_unique_names():
    # We can't use the settings fixture because it's not actually a LazySettings
    # This test does not make changes to this object and so this is fine
    from django.apps import apps
    from django.conf import settings

    # Create the object representing the project with a custom discoverer
    # That will record information about each model/field it comes across
    project = dataclasses.replace(
        VirtualDependencyHandler.make_project(
            project_root=PROJECT_ROOT / "src", django_settings_module="tests.settings"
        ),
        discovery=django_analysis.discovery.Discovery(
            # Here I add custom discovery logic so the test can do something different
            # These are objects that take in an instance of Loaded to operate on
        ),
    )

    # We already have a loaded django project, so we can create our own Loaded instance
    # without performing that startup logic again
    loaded_project = django_analysis.Loaded(
        project=project,
        root_dir=project.root_dir,
        env_vars=project.env_vars,
        discovery=project.discovery,
        settings=settings,
        apps=apps,
    )

    # Execute the discovery logic
    loaded_project.perform_discovery()

    # And then logic happens here that interprets what was discovered
    # To find querysets that need to be given unique names
`}
/>

<h2>Thanks for reading</h2>

<p>
  Hopefully this has been useful. It's a different mindset to think about Python from a
  static perspective. It's such a dynamic language and the best kind of python is able to
  lean into that without relying on hidden side effects. I really do believe that having
  static types can be used to add structure without removing flexibility, and tends to
  only very awkward when we're doing things we shouldn't be doing anyways!
</p>
