<script lang="ts">
    import Python from "@app/prism/python.svelte";
    import Note from "@blog/note.svelte";
    import Quote from "@blog/quote.svelte";
</script>

<p>
    I've gone through a journey with static typing, starting from thinking
    static types were the programming equivalent of unnecessary bureaucracy to
    thinking it's insane to write any code without having some kind of type
    checker!
</p>

<p>
    My appreciation for a type checker started when I learnt how to write Scala
    and then cemented when I spent five years writing Go for LIFX. Around 2022 I
    started to figure out how to use mypy and what it looks like to take my
    style of Python and formalise how everything fits together and from the
    start of 2023 I've had a few sprints where I tried to push the limits of
    mypy and I'm gonna use this post to explain the approach I've currently
    landed on.
</p>

<h2>What is a typing.Protocol?</h2>

<p>
    Python’s static type checking is an interesting thing cause it’s effectively
    glorified comments that can be understood by a linter, for an extremely
    dynamic interpreted language.
</p>

<p>
    I’ve been writing Python nonstop for over 15 years at this point (and for a
    large period of that I really mean an unhealthy type of nonstop) and I
    learnt how to use the language without types. What I’ve found as I learn to
    adapt my style to including these type annotations is a lot of what I did to
    make code reliable at runtime was the same things the type system
    formalises.
</p>

<p>
    The <mark>typing.Protocol</mark> provided to us is a way to declare the shape
    of some object. For those familiar with Go, they're like an Interface in that
    language, but with some more capability.
</p>

<p>
    For example, if I want to represent an object that has at least a <code
        >blah</code
    > method:
</p>

<Python
    source={`
class Thing:
    def blah(self) -> None: ...
`}
/>

<p>
    And like Go interfaces (and unlike java interfaces) I don’t need to
    explicitly declare when an object satisfies this interface.
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
    In all of these cases if I had something that takes in a <mark>Thing</mark> I
    can use an instance of those objects to satisfy that interface
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
    In all of these cases what’s important is that there is a <mark>blah</mark> method
    that can be called without passing anything in and a None value is returned.
    What that method does or where it gets other input from isn’t relevant.
</p>

<p>
    This gets even more interesting with the "dunder" methods. Especially the
    ability to represent a callable object
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
    Note <mark>_with_def_syntax</mark> doesn't have the slash in the signature but
    it still satisfies the interface, because not having the slash means there are
    more ways to call this method rather than less. If it was the other way round
    then the implementation would have less functionality than the protocol and the
    type checker would complain.
</Note>

<h2>Represent class constructors as a separate protocol</h2>

<p>
    A pattern that is less obvious but very powerful is the idea that the
    constructor of an object is it's own separate protocol
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
    The idea is that a constructor (specifically <mark>__init__</mark> in the Python
    language) is an implementation detail for creating an object rather than an intrinsic
    part of that object.
</p>

<p>
    The reason this is useful is the same reason Java has multiple constructors.
    It lets us represent what the object is and needs separately from how we
    satisfy those needs.
</p>

<p>
    Python does not have multiple constructors but we do have class methods and
    they work perfectly well for this purpose
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
    In this example there is a protocol that represents the shape for some
    object, a protocol that represents the ability to create that object from
    two integers, and a single implementation that satisfies both protocols.
</p>

<p>Whereas a more "straightforward" implementation may instead do</p>

<Python
    source={`
import dataclasses
from collections.abc import Sequence
from typing import Protocol


class Stuff(Protocol):
    numbers: Sequence[int]

    def __init__(self, *, start: int, end: int) -> "Stuff": ...


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

<p>
    There are three properties of this design that I believe is less than ideal
</p>
<ul>
    <li>
        <p>
            In <mark>MyStuffWithOperationInConstructor</mark> we are creating an
            object with an <mark>__init__</mark> method that throws away what it
            receives
        </p>
    </li>
    <li>
        <p>
            The <mark>numbers</mark> attribute on such an object will either be
            dynamic when it should be static, or the <mark>__init__</mark> method
            needs to perform some calculations to set the value for it.
        </p>
    </li>
    <li>
        <p>
            When writing stub implementations of <mark>Stuff</mark> for tests, I
            have to know about and care about the objects use to construct this object
            in deployed environments that I otherwise may not care about in that
            test (i.e. unnecessary coupling with implementation details).
        </p>
    </li>
</ul>

<p>
    The separation of concern here is separating what I want from how to get it.
</p>

<Note>
    The important thing isn’t the type annotations, but rather using the
    annotations to guide thinking about data and logic flow. The annotations are
    a tool rather than a goal. If the annotations are awkward, it’s the linter
    trying to communicate that something about that flow is awkward.
</Note>

<h2>Confirming something satisfies an interface</h2>

<p>
    It’s very useful that we don’t have to explicitly declare that an object
    implements an interface, but it still can be useful to make mypy confirm
    that’s true when we make something specifically to implement an interface
    (having a choice is about being able to do something just as much as it’s
    about having the choice to not do something!)
</p>

<p>
    There isn’t a purpose built way to do this in mypy but there is a trick that
    I find most people go through the stages of grief over:
</p>

<Python
    source={`
from typing import TYPE_CHECKING, Protocol, cast


class Want(Protocol):
    def __call__(self) -> bool: ...


class MyFirstCallable:
    def __call__(self) -> bool:
        return True


class MySecondCallable:
    def __call__(self) -> bool:
        return False


MyThirdCallable = lambda: True

if TYPE_CHECKING:
    _MFC: Want = cast(MyFirstCallable, None)
    _MSC: Want = cast(MySecondCallable, None)
    _MTC: Want = MyThirdCallable
`}
/>

<p>There are several parts to this orchestra:</p>

<ul class="tight-list">
    <li><p>The if condition</p></li>
    <li><p>The naming scheme</p></li>
    <li><p>The cast</p></li>
    <li><p>What mypy sees</p></li>
</ul>

<p>
    So first, that if condition. This says only look at this code at static
    time. Effectively this means this code is never executed. It is only ever
    statically analyzed. This isn’t strictly necessary but as python is an
    interpreted language, it brings the neglible runtime risk to zero, ensures
    we don’t create anything that may accidentally be used by external modules
    at runtime to zero, and tells other humans these words are explicitly only
    for the type checker
</p>

<p>
    The naming scheme is each variable we create is prefixed with an underscore
    and is the name of the variable we are checking as an acronym. The idea is
    that in python the same name cannot be given different types and so we want
    a different name for each object we are checking but we don’t actually care
    what that name is. I tend to find most of the time an acronym will be unique
    enough that extra letters aren’t required.
</p>

<p>
    That cast is possibly the strangest part. It does make perfect sense though,
    I promise!
</p>

<p>
    In Python the cast lets us tell mypy to think that we have an object here
    whose type is the first argument. At runtime this function returns that
    second argument without any processing and nothing changes. But at static
    time mypy will believe the object here is this other type. As a general rule
    i’m not a fan of cast and I think it’s easy to use it to create code that
    isn’t type safe, but it’s perfect for this situation.
</p>

<p>So in effect we say</p>

<Python source={`_MFC: Want = cast(A, None)`} />

<p>
    Mypy will interpret this as saying we have a variable that has type <code
        >Want</code
    >
    and we are assigning to it an instance of <mark>A</mark> This is useful
    because if A does not in fact satisfy <mark>Want</mark> then mypy will complain
    at us about that! (the point of a linter is to complain when things don’t match
    our expectations)
</p>

<p>When a developer is new to mypy it’s tempting to instead do this</p>

<Python source={`_MFC: type[Want] = A`} />

<p>
    However this gives really poor errors cause, whilst this description isn't
    technically true, mypy effectively sees:
</p>

<Python source={`_MFC: Callable[[] Want] = Callable[[], A]`} />

<p>
    And mypy doesn't give the same level of detail when comparing the values
    inside a generic (<mark>Callable</mark> is a generic container)
</p>

<p>Also, I'll draw some attention to that last example:</p>
<p>
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
</p>

<p>
    We don't need the same <mark>cast</mark> trick here because
    <mark>MyThirdCallable</mark> is already an object that satisfies the protocol!
</p>

<p>
    For completeness, the examples in the previous section about splitting the
    shape of the object from the construction of that object, I'd write:
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
    I find the patterns above to be useful when generics aren’t involved, but
    they become especially useful when generics are involved. Especially when
    mypy strict mode is used (which I recommend, it makes it a lot more obvious
    when mypy isn't complaining because it's comparing against <mark>Any</mark> types)
</p>

<p>I’ll expand on what I mean further down, but first:</p>

<h2>
    The runtime_checkable decorator doesn’t do what it looks like it’s doing
</h2>

<p>
    I want to dive into the difference between an <mark>abc</mark> class and a protocol.
    On the surface it appears they do the same thing and can be used for the same
    purpose. I’m here to tell you that’s not the case!
</p>

<p>
    In short, Protocol classes are the interface for use and abc classes are the
    interface for implementation. There is a 1:n relationship between a protocol
    and an abc class (and potentially vice verca!)
</p>

<p>
    This is relevant to a conversation about protocols because sometimes you
    need to do checks at runtime to know what shape an object is. And it’s
    really tempting to do the following:
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
    The problem however is that <mark>runtime_checkable</mark> only checks that
    names exist on the object.
    <strong>It does not check that those attributes are the correct type</strong
    > (and fundamentally can’t do that kind of check at runtime, especially when
    generics are involved)
</p>

<p>
    It’s certainly safe to do that kind of check on known abc classes though.
    Here’s an example that’s easy to (incorrectly) dismiss as verbose and
    repetitive.
</p>

<Python
    source={`
import abc
from typing import Protocol


class Thing(Protocol):
    @property
    def val(self) -> str: ...

    def process(self) -> bool: ...


class ThingBase(abc.Abc):
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
`}
/>

<p>
    The downside is the code that does this kind of check does need to know
    about abstract classes that satisfy the protocol but I’d argue the
    situations where we’ve dynamically created some object that can be anything
    should be limited and part of that contract is saying it should be
    implemented in terms of some specific abc class.
</p>

<p>
    The reason this makes sense even without the type checker is that static
    analysis does not care about run time values.
</p>

<p>It’s an important concept that does need to be repeated</p>

<Quote
    >Values are a run time concept and are irrelevant to the type checker.</Quote
>

<p>
    So when we have a value that only exists at runtime, we can’t represent it
    only in terms of type checking concepts. We must first represent it as a
    concrete runtime object (in this case a subclass of some specific abc)
    before we can then represent it in terms of a type checking concept.
</p>

<p>
    So on my comment about this being verbose. I’ve come to the conclusion that
    making an abc for every protocol is indeed verbose and unecessary, but there
    are definitely places where it’s useful and necessary.
</p>

<p>
    For example on a Django project using <a
        href="https://docs.djangoproject.com/en/5.1/ref/utils/#django.utils.module_loading.import_string"
        >import_string</a
    > on some string you found on django settings. The return of that could be literally
    anything. And so we need a way to assert the type of that return matches what
    is expected.
</p>

<p>
    The pattern that I have landed on around this is to set an expectation that
    what is found will be called, and we care about the type of the thing that
    has been returned
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
    If having known abc classes feels like an unnecessary restriction, remember
    that a Protocol doesn't exist at runtime, but an abc class does.
</p>

<Note
    >I think it's an anti-pattern to instead check that we've imported a
    specific class instance like the following for the same reasons that it's a
    good idea to split the shape of an object from how that object is created.

    <Python
        source={`
from django.conf import settings
from django.utils.module_loading import import_string


def get_some_instance() -> MyProtocol:
    constructor = import_string(settings.SOME_CLASS)
    # anti-pattern!!!! Don't do this
    # instead prefer isinstance on what is returned from calling the constructor
    assert issubclass(constructor, SomeKnownABC)
    return constructor()
`}
    />
</Note>

<p>
    If you have a situation where you need to pass something in to that
    callable, then we have the same problem where we need to first assert a
    value is some concrete type before we can do anything with any kind of type
    safety. The pattern I advocate is to expect an intermediary:
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
    In all cases the idea is that what we get from <mark>import_string</mark> should
    always be treated as a callable that receives no arguments and either returns
    the thing we want, or the ability to make the thing we want given some extra
    runtime information.
</p>

<Note>
    The reason we want to call what we get from <mark>import_string</mark> is because
    without some interesting code (I've built some nice test helpers at work around
    this mechanism) it will always return something at the top level of a module.
    So making sure it's a callable means that we have the capacity to avoid import
    time side effects and have the control to ensure specific operations only happen
    after everything else has been loaded.
</Note>

<h2>Generics</h2>

<p>
    Things are pretty simple until we start to add generics, and whilst it's
    certainly manageable, it is a bit less simple and straight forward.
    Personally I see that as an education problem, same as every programming
    concept in any language. Some concepts require more effort to take on than
    others, but it can be easy sometimes to mistake unfamiliarity as complexity.
</p>

<p>
    The main difficulty when it comes to generics in mypy is we don't have
    "higher kinded type vars", which prevents the following:
</p>

<Python
    source={`
from typinng import Generic, TypeVar

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
        href="https://github.com/python/typing/issues/548"
        >mypy doesn't support it</a
    >
</p>

<p>
    The good news is that what we do want isn’t as restrictive as it first
    appears. The rules I follow are:
</p>

<ul class="tight-list">
    <li><p>Never make a type var from a generic class</p></li>
    <li><p>Make the data generic and the APIs well defined</p></li>
    <li>
        <p>
            Disconnect what is needed for the API from what is needed to
            implement the API.
        </p>
    </li>
    <li><p>Avoid contravariant types (pattern for this mentioned below)</p></li>
</ul>

<h2>Don’t make a typevar from a generic class</h2>

<p>
    This becomes a bit more obvious when you have strict mode turned on as
    you’ll find mypy complains about requiring the type var gets filled in. So
    for example in the example above the type var for the collection is
    implicitly represented as
</p>

<Python
    source={`
T_MyCollection = TypeVar("T_MyCollection", bound=T_MyCollection[Any])
`}
/>

<p>
    So it becomes a question of what to fill have in place of that <mark
        >Any</mark
    >. The problem becomes whatever we fill it in with will restrict that type
    var in a way that cannot be customised. And it’s inevitable to reach a point
    where we end up with some code that we want to extend such that the Item has
    some extra method on it and it becomes a liskov violation to depend on that
    extra method.
</p>

<Note
    >In mypy <mark>object</mark> and <mark>Any</mark> are both wildcards but
    <mark>object</mark>
    represents no functionality whereas <mark>Any</mark> represents no types,
    and as a general rule avoiding <mark>Any</mark> makes for code that ages less
    poorly</Note
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
    This however is less of a problem than it first seems, cause a type var is
    used to represent different API surfaces and isn't necessary to represent
    different implementations for the same API surface. We don't need to use a
    type var for something that has a stable API.
</p>

<p>
    The example above is a very simple case of the problem but the one change to
    make the types carry through would be to not have the <mark
        >T_Collection</mark
    > type var at all:
</p>

<Python
    source={`
def takes_collection(collection: Collection[T_Item]) -> T_Collection[T_Item]:
    # Something happens with the collection here
    return collection
`}
/>

<p>
    Essentially we want to make it so we are defining a stable API in terms of
    an unstable source of data and then it becomes a case of spending the design
    effort to make sure that the stable API surface is defined by what is being
    achieved rather than in terms of how it's being achieved.
</p>

<p>
    I recommend <a href="https://www.youtube.com/watch?v=OMPfEXIlTVE"
        >this Sandi Metz talk</a
    > talking about using composition to expand an API surface
</p>

<h2>A side note about variance</h2>

<p>
    TypeVars have a property to them called "variance", of which there are three
    types:
</p>

<ul class="tight-list">
    <li><p>Invarant</p></li>
    <li><p>Covariant</p></li>
    <li><p>Contravariant</p></li>
</ul>

<p>
    These terms relate to how the relationship between types in different
    containers affect the relationship between those containers.
</p>

<p>
    So say we have a container generic called <mark>Container</mark> and it
    takes a single TypeVar, and we have two classes <mark>A</mark>
    and <mark>B</mark>. We want to know if
    <mark>Collection[A]</mark> can be used where a <mark>Collection[B]</mark> is
    required.
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

<Python source={`T_CO_Item = TypeVar("T_CO_Item", covarant=True`} />

<p>Or contravariant if we say</p>

<Python source={`T_COT_Item = TypeVar("T_COT_Item", contravariant=True`} />

<Note>
    The name is irrelevant, but I do name them as "T_XXX" to visually
    disambiguate type vars from other variables. And I never use "T" or "U" as
    doing a find in a document for a single capital "T" is an awful experience.
</Note>

<p>
    If the type var is contravariant then <mark>Collection[A]</mark> can be used
    where
    <mark>Collection[B]</mark> is required if <mark>B</mark> is always a subtype
    of <mark>A</mark>
</p>

<p>
    If the type var is covariant then <mark>Collection[A]</mark> can be used
    where
    <mark>Collection[B]</mark> is required if <mark>A</mark> is always a subtype
    of <mark>B</mark>
</p>

<p>An invariant type var is when the other two rules can be violated.</p>

<p>
    Mypy will guide you to using the correct form but essentially if the type
    var is only ever used as an input type then it must be contravariant. If the
    type var is only ever used as an output it must be covariant, otherwise it
    is invariant.
</p>

<p>
    This is why <mark>Sequence</mark> is covariant, but list is not! Because Sequence
    is immutable whereas list is mutable.
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

    def add_item(self, item: T_Item) -> None: ...
`}
/>

<p>
    In our mutable collection, the item is used as an input in <mark
        >add_item</mark
    > and so we cannot make that type var be covariant.
</p>

<p>This is why the following is a liskov violation</p>

<Python
    source={`
import dataclasses


class A:
    def hello() -> None: ...


class B(A):
    def hi() -> None: ...


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
    We should be able to pass an instance of <mark>ThingChild</mark> into this function
    but if we do so we don’t realise in processes_thing that we need to append an
    instance of B into the items!
</p>

<p>
    The way to solve this is to make the actions here a part of the explicit
    public API surface:
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
class ThingBase(Generic[T_Item], abc.Abc):
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
        ThingA(items=self._items).process()
        for item in self.items:
            item.hello()


def processes_thing(thing: Processor) -> None:
    thing.add_one()
    thing.process()
`}
/>

<p>
    This works because the Processor interface does not care about the how, it
    only cares about the what. So keeping the specifics of the Item as an
    implementation detail means we are able to make an orchestrator (what
    <mark>processes_thing</mark> is) that works for many different implementations
    without itself being defined as generic.
</p>

<Note>
    Note we can pass in a list[B] to the constructor of <mark>ThingA</mark> because
    input arguments are always contravariant, which means extra API surface is ignored
    rather than remembered.
</Note>

<p>
    Ultimately the behaviour is that inputs are contravariant because the
    implementation will ignore the extra methods and outputs are covariant
    because the caller expects the extra methods. And the game is all about
    figuring out what happens when we substitute in a different implementation.
</p>

<h2>Different data, same functionality</h2>

<p>
    Trying to design an API protocols first becomes a lot easier when as the
    developer you recognise that what the protocol needs does not need to
    include everything the implementation needs.
</p>

<p>
    Unfortunately this means it does take work to get it right! In the projects
    I’ve tried to do this in I found that the protocols would tell me when parts
    of the data/logic flow had the wrong responsibilities by being awkward to
    work with. The more I was able to make for good coupling and cohesion in the
    design, the more helpful the protocols became. This however is the part
    that’s hard to sell: the need for a lot of upfront patient design work.
    Other than patterns that discourage easy-to-avoid foot guns I don’t have
    good answers for this problem yet.
</p>
