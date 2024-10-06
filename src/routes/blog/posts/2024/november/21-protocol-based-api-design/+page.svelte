<script lang="ts">
    import Python from "@app/prism/python.svelte";
    import Note from "@blog/note.svelte";
    import Quote from "@blog/quote.svelte";
</script>

<p>
    I have a perspective of programming that comes from a history of rewriting
    the same code over and over again. It means my main programming skill is to
    take code that acheives something and rearranging the flow of data and logic
    to be arguably clearer and easier to work with.
</p>

<p>
    I read code breadth first, I have a functional OO design philosophy and I
    see myself as a framework developer (I care more about how than what) and so
    for me clearer and easier to work with comes from a place that prioritises
    separation of concern at every level.
</p>

<p>
    I started to figure out how to use Python static type checking since a
    couple years ago, and I’ve especially leaned into pushing the limits of
    static type checking in Python over the past year (from a background of
    learning to appreciate type systems from five years of experience with Go,
    and from learning Scala) and I’m gonna attempt to write here some thoughts
    of how I think about typing.Protocol.
</p>

<h2>what is a typing.Protocol?</h2>

<p>
    Python’s static type checking is an interesting thing cause it’s effectively
    glorified comments that can be understood by a linter, for an extremely
    dynamic interpreted language.
</p>

<p>
    I’ve been writing Python nonstop for over 15 years at this point (for a
    large period of that I really mean nonstop) and I learnt how to use the
    language without types. What I’ve found as I learn to adapt my style to
    including these type annotations is a lot of what I did to make code
    reliable at runtime was the same things the type system formalises.
</p>

<p>
    The <mark>typing.Protocol</mark> provided to us is a way to declare the shape
    of some object. It’s like an interface in Go for those familiar with that language,
    but with attributes and operator overloading (python dunder methods).
</p>

<p>
    For example, if I want to represent an object that has at least a <code
        >blah</code
    >
    method:
</p>

<Python
    source={`class Thing:
    def blah(self) -> None: ...
`}
/>

<p>
    And just like Go interfaces (and unlike java interfaces) I don’t need to
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
    source={`def takes_thing(thing: Thing) -> None:
    thing.blah()

takes_thing(One())
takes_thing(Two())
takes_thing(Three(option="three"))
`}
/>

<p>
    In all of these cases what’s important is that there is a <mark>blah</mark> method
    that can be called without passing anything in, that returns a None value. What
    that method does or where it gets other input from isn’t relevant.
</p>

<p>
    This gets even more interesting with the dunder methods. Especially the
    ability to represent a callable object
</p>

<Python
    source={`class MyCallable(Protocol):
    def __call__(self, val: str, /) -> str: ...
`}
/>

<p>There are multiple ways to satisfy this</p>

<Python
    source={`def _with_def_syntax(val: str) -> str:
    # note that this still satisfies the interface even without the slash
    return val

with_def_syntax: MyCallable = _with_def_syntax

as_a_lambda: MyCallable = lambda val: "hi"

def _function_taking_more(val: str, times: int) -> str:
    return val * times

with_currying: MyCallable = functools.partial(_function_taking_more, times=10)

class ACallable:
    def __call__(val: str) -> str:
        return f"from a noun: {val}"

as_an_object: MyCallable = ACallable()
`}
/>

<p>And a really important example, representing a constructor:</p>

<Python
    source={`class Thing(Protocol):
    def answer(self) -> int: ...

class ThingMaker(Protocol):
    def __call__(self) -> Thing: ...
`}
/>

<h2>represent class constructors as a separate protocol</h2>

<p>
    I find people go through the stages of grief with that last example in the
    previous section and I feel it’s emblematic of the reason lots of Python
    developers find it difficult to grok static type checking in Python.
</p>

<Note>
    I’ll take a moment to point out the title of this post is "strong opinions"
    for a reason
</Note>

<p>
    The idea is that making an object is separate from what the object is, and
    that the <mark>__init__</mark> dunder method is an implementation detail rather
    than the only way to get that object.
</p>

<p>
    The reason this is useful is the same reason Java has multiple constructors.
    It lets us represent what the object needs without making the object be hard
    coded to any particular way of getting those requirements.
</p>

<p>
    Python does not have multiple constructors but we do have class methods and
    they work perfectly well for this purpose
</p>

<Python
    source={`class Stuff(Protocol):
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
    Here we have an object that holds a sequence of numbers and one way of
    creating it from a start and end. Very contrived example, but the idea is
    that it’s far more flexible to represent it like this where there is a 1:n
    relationship of object to constructor.
</p>

<p>Whereas a more straightforward implementation may instead do</p>

<Python
    source={`class Stuff(Protocol):
    numbers: Sequence[int]

    def __init__(self, *, start: int, end: int) -> Stuff: ...

class MyStuffVariant1:
    def __init__(self, *, start: int, end: int) -> None:
        self.numbers = list(range(start, end))

@dataclasses.dataclass
class MyStuffVariant2:
    start: int
    end: int

    @property
    def numbers(self) -> list[int]:
        return list(range(self.start, self.end))
`}
/>

<p>I have three problems with this</p>
<ol>
    <li>
        <p>
            We are creating an object with a <mark>__init__</mark> that throws away
            what it receives
        </p>
    </li>
    <li>
        <p>
            We are either creating an <mark>__init__</mark> that performs an action
            or creating an object with a dynamic property that should be static
        </p>
    </li>
    <li>
        <p>
            When writing tests for code that receives one of these <code
                >Stuff</code
            >
            objects, I have to care about objects used to construct the object that
            I otherwise may not care about in that test.
        </p>
    </li>
</ol>

<p>
    The separation of concern here is separating what I want from how to get it.
</p>

<Note>
    The important thing isn’t the type annotations, but rather using the
    annotations to guide thinking about data and logic flow. The annotations are
    a tool rather than a goal. If the annotations are awkward, it’s the linter
    trying to communicate that something about that flow is awkward.
</Note>

<h2>confirming something satisfies an interface</h2>

<p>
    It’s very useful that we don’t have to explicitly declare that an object
    implements an interface, but it still can be useful to make mypy confirm
    that’s true when we make something specifically to implement an interface
    (having a choice is about being able to do something just as much as it’s
    about having the choice to not do something!)
</p>

<p>
    There isn’t really a built in way to do this in mypy but there is a trick
    that is another thing I feel people go through the stages of grief over
</p>

<Python
    source={`class Want(Protocol):
    def __call__(self) -> bool: ...

class MyFirstCallable:
    def __call__(self) -> bool: return True

Class MySecondCallable:
    def __call__(self) -> bool: return False

C = lambda: True

if TYPE_CHECKING:
    _MFC: Want = cast(A, None)
    _MSC: Want = cast(B, None)
    _C: Want = C
`}
/>

<p>There are several parts to this orchestra:</p>
<ol>
    <li><p>The if condition</p></li>
    <li><p>The naming scheme</p></li>
    <li><p>The cast</p></li>
    <li><p>What mypy sees</p></li>
</ol>

<p>
    So first, that if condition. This says only look at this code at mypy time.
    Effectively this means this code is never executed. It is only ever
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
    second argument without any processing and nothing changes. But at mypy time
    mypy will believe the object here is this other type. As a general rule i’m
    not a fan of cast and I think it’s easy to use it to create code that isn’t
    type safe, but it’s perfect for this situation.
</p>

<p>So in effect we say</p>

<Python
    source={`_MFC: Want = cast(A, None)
`}
/>

<p>
    Mypy will interpret this as saying we have a variable that has type <code
        >Want</code
    >
    and we are assigning to it an instance of <mark>A</mark> This is useful
    because if A does not in fact satisfy <mark>Want</mark> then mypy will complain
    at us about that! (the point of a linter is to complain when things don’t match
    our expectations)
</p>

<p>When new to mypy it’s tempting to instead do this</p>

<Python
    source={`_MFC: type[Want] = A
`}
/>

<p>
    However this gives really poor errors cause, whilst technically this isn’t
    true, mypy effectively interprets this as
</p>

<Python
    source={`_MFC: Callable[[] Want] = Callable[[], A]
`}
/>

<p>
    And doesn’t expand on the difference between Want and A in as useful a way
    as when you compare an instance to the type.
</p>

<p>
    One final point is I don’t need to use cast when comparing <mark>C</mark>
    because C is already an object that satisfies <mark>Want</mark>.
</p>

<p>
    In our examples above around splitting the shape of an object from it’s
    constructor we end up with
</p>

<Python
    source={`if TYPE_CHECKING:
    _S: Stuff = cast(MyStuff, None)
    _SC: StuffMaker = MyStuff.create_from_range
`}
/>

<h2>Generics</h2>

<p>
    I find the patterns above to be useful when generics aren’t involved, but
    they become very useful when generics are involved. Especially when mypy
    strict mode is used (which I recommend, lots of frustration has led to a
    much greater understanding).
</p>

<p>I’ll expand on that further down, but first:</p>

<h2>runtime_checkable doesn’t do what it looks like it’s doing</h2>

<p>
    I want to dive into the difference between an <mark>abc</mark> class and a protocol.
    On the surface it appears they do the same thing and can be used for the same
    purpose. I’m here to tell you that’s not the case!
</p>

<p>
    In short, Protocol classes are the interface for use and abc classes are the
    interface for implementation
</p>

<p>
    There is a 1:n relationship between a protocol and an abc class (and
    potentially vice verca!)
</p>

<p>
    This is relevant to a conversation about protocols because sometimes you
    need to do checks at runtime to know what shape an object is.
</p>

<p>And it’s really tempting to do this</p>

<Python
    source={`@runtime_checkable
class MyProtocol(Protocol):
    val: str

    def process(self) -> bool:...


def do_something(o: object) -> bool:
    if isinistance(o, MyProtocol):
        return o.process()
`}
/>

<p>
    The problem however is that runtime_checkable only checks that names exist
    on the object. It does not check that those attributes are the correct type
    (and fundamentally can’t do that kind of check at runtime, especially when
    generics are involved)
</p>

<p>
    It’s certainly safe to do that kind of check on known abc classes though.
    Here’s an example that’s easy to (incorrectly) dismiss as verbose and not
    DRY in a bad way:
</p>

<Python
    source={`class Thing(Protocol):
    @property
    def val(self) -> str: ...

    def process(self) -> bool: ...

class ThingBase(abc.Abc):
    @property
    @abc.abstractmethod
    def val(self) -> str: ...

    @abc.abstractmethod
    def process(self) -> bool: ...

def takes_my_protocol(o: MyProtocol) -> bool:
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
    For example using <mark>import_string</mark> on some string you found on django
    settings. The return of that could be literally anything. And it’s reasonable
    to say:
</p>

<Python
    source={`def get_some_instance() -> MyProtocol:
    constructor = import_string(settings.SOME_CLASS)
    instance = constructor()
    assert isinstance(instance, SomeKnownABC)
    return instance
`}
/>

<Note>
    I’m expanding on the ideas above that a constructor is separate from the
    object and i’m not assuming that what I get back is a subclass of the abc,
    but rather that it’s a callable object that gives me an instance of that
    abc.
</Note>

<p>
    If you have a situation where you need to pass something in to what we get
    from import_string then i’d strongly recommend
</p>

<Python
    source={`Class Maker(abc):
    @abc.abstractmethod
    def create_thing(stuff: Stuff) -> MyThingProtocol:...
 
def get_some_instance(stuff: Stuff) -> MyThingProtocol:
    constructor = import_string(settings.SOME_CLASS)
    instance = constructor()
    assert isinstance(instance, Maker)
    return instance.create_thing(stuff)
`}
/>

<p>
    This allows to ensure that the object the setting points to is able to avoid
    any processing at import time, and means we are able to have a type safe
    function to pass some specific object into.
</p>

<Note>
    This is also nice because the abc class becomes a really thin bridge between
    runtime and static time.
</Note>

<h2>Generics</h2>

<p>
    Things are pretty simple until we start to add generics, and then it gets a
    bit less simple, and a little less straight forward.
</p>

<p>
    The main problem we come across is that mypy doesn’t have generic type vars.
</p>

<p>So you can’t do this</p>

<Python
    source={`T_Item = TypeVar("T")
T_MyCollection = TypeVar("T_MyCollection", bound="MyCollection")

class MyCollection(Generic[T_Item]):
    # imagine some implementation here
    ...

def add_to_collection(item: T_Item, collection: T_MyCollection[T_Item]) -> None:
    ...
`}
/>

<p>
    Unfortunately this looks intuitive, but just doesn’t do what it looks like.
</p>

<p>
    The good news is that what we do want isn’t as restrictive as it first
    appears. The rules I follow are:
</p>

<ul>
    <li><p>Never make a type var from a generic class</p></li>
    <li><p>Avoid contravariant types (pattern for this mentioned below)</p></li>
    <li><p>Make the data generic and the apis well defined</p></li>
    <li>
        <p>
            Disconnect what is needed for the api from what is needed to
            implement the api
        </p>
    </li>
</ul>

<h2>don’t make a typevar from a generic class</h2>

<p>
    This becomes a bit more obvious when you have strict mode turned on but
    you’ll find mypy complains about requiring the type var gets filled in. So
    for example in the example above the type var for the collection is
    implicitly represented as
</p>

<Python
    source={`T_MyCollection = TypeVar("T_MyCollection", bound=T_MyCollection[Any])
`}
/>

<p>
    So it becomes a question of what to fill that in with. The problem becomes
    whatever we fill it in with will restrict that type var in a way that cannot
    be customised. And it’s inevitable to reach a point where we end up with
    some code that we want to extend such that the Item has some extra method on
    it and it becomes a liskov violation to depend on that extra method.
</p>

<p>
    The argument I make is that it’s far easier to have stable apis that hold
    changeable apis.
</p>

<p>
    For example it’s far easier to string through different data if instead of a
    variable api for the collection, we instead have a transformation to a
    different collection type
</p>

<Python
    source={`#I need an example here, too hard to make on a phone#
`}
/>

<p>
    The key thing to remember is that the only time a type var is necessary is
    when the api surface may change. If a type var is used to represent
    different functionality expressed through the same api surface then a
    protocol will be perfectly sufficient. And the game becomes making it
    unnecessary to have a changing api surface
</p>

<h2>a side note about variance</h2>

<p>There are three general types of typevars in mypy</p>

<ul>
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
    takes a single TypeVar of any type. And we have two classes <mark>A</mark>
    and <mark>B</mark> we want to know if
    <mark>Collection[A]</mark> can be used where a <mark>Collection[B]</mark> is
    required.
</p>

<p>So say our Collection is defined as</p>

<Python
    source={`T_Item = TypeVar("T_Item")

class Collection(Protocol[T_Item]):
    ...
`}
/>

<p>
    In this case <mark>T_Item</mark> is "invariant". T_Item can be "covariant" if
    we say instead
</p>

<Python
    source={`T_CO_Item = TypeVar("T_CO_Item", covarant=True
`}
/>

<p>Or contravariant if we say</p>

<Python
    source={`T_COT_Item = TypeVar("T_COT_Item", contravariant=True
`}
/>

<Note>
    The name is irrelevant, but I do name them this way to visually disambiguate
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
    source={`class ImmutableCollection(Protocol[T_CO_Item]):
    @property
    def items(self) -> Sequence[T_CO_Item]: ...

class MutableCollection(Protocol[T_Item]):
    @property
    def items(self) -> Sequence[T_Item]: ...
    def add_item(self, item: T_Item) -> None:
        ...
`}
/>

<p>
    In our mutable collection, the item is used as input in add_item and so we
    cannot make that type var be covariant.
</p>

<p>This is why the following is a liskov violation</p>

<Python
    source={`class A:
    def hello() -> None:...

class B(A):
    def hi() -> None:...

@attrs.frozen
class Thing:
    items: list[A]
   
    def process(self) -> None:
        for item in items:
            item.hello()

@attrs.frozen(frozen=True)
class ThingChild(Thing):
    items: list[B] # liskov violation!
   
    def process(self) -> None:
        super().process()
        for item in items:
            item.hi()
`}
/>

<p>Because say we have a function that takes one of these Thing instances</p>

<Python
    source={`def processes_thing(thing: Thing) -> None:
    thing.items.append(A())
    thing.process()
`}
/>

<p>
    We should be able to pass an instance of ThingChild into this function but
    if we do so we don’t realise in processes_thing that we need to append an
    instance of B into the items!
</p>

<p>This is also a lesson about mutability in public interfaces being bad.</p>

<p>The way to solve this is something like</p>

<Python
    source={`class Processor(Protocol):
    def add_one(self) -> None:...
    def process(self) -> None:...

class A:
    def hello() -> None:...

class B(A):
    def hi() -> None:...

class ThingBase(Generic[T_Item], abc.Abc):
    _items: list[T_Item]

    @abc.abstractmethod
    def add_one(self) -> None:...
   
    @abc.abstractmethod
    def process(self) -> None:
        ...

@attrs.frozen
class ThingA(ThingBase[A]):
    _items: list[A]

    def add_one(self) -> None:
        self._items.append(A())

    def process(self) -> None:
        for item in items:
            item.hello()

@attrs.frozen
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
    processes_thing is) that works for many different implementations without
    itself being defined as generic.
</p>

<Note>
    We can pass in a list[B] to the constructor of ThingA because input
    arguments are always contravariant.
</Note>

<p>
    Ultimately the behaviour is that inputs are contravariant because the
    implementation will ignore the extra methods and outputs are covariant
    because the caller expects the extra methods. And the game is all about
    figuring out what happens when we substitute in a different implementation.
</p>

<h2>different data, same functionality</h2>

<p>
    Trying to design an api from protocols first becomes a lot easier when as
    the developer you recognise that what the protocol needs does not need to
    include everything the implementation needs.
</p>

<p>
    Unfortunately this means it does take work to get it right! In the projects
    I’ve tried to do this in I found that the protocols would tell me when parts
    of the data/logic flow had the wrong responsibilities by being awkward to
    work with. The more I was able to make for good coupling and cohesion in the
    design, the more helpful the protocols became. This however is the part
    that’s hard to sell: the need for a lot of upfront patience and
    perseverance. Other than patterns that discourage footguns I don’t have a
    great answer to that, but I think the same is true for every part of what we
    do as programmers.
</p>

<p>
    I’ve found that often when some object is made generic, it’s external api
    surface stays the same, the part that’s different is the shape of the data
    it holds. And so the solution is to separate the idea of that external api
    surface from how it’s implemented.
</p>

<Python
    source={`
# I need some kind of diagram venn thing happening here showing the external api is made up by combining different interfaces# 
`}
/>

<p>
    The hat metaphor is really useful for api design. A role is like a hat,
    there are many hats, and any single person can put on any combination of
    hats. As an api designer I have to think of how the api is used by users of
    the api, implementors of the api, and from the perspective of people
    benefiting from the api being used to solve a problem. The api is very
    different things to these different perspectives and we have the tools to
    hide and show the parts that are relevant to each hat.
</p>
