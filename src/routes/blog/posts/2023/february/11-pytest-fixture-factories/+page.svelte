<script lang="ts">
  import Python from "@app/prism/python.svelte";
</script>

<p>
  I'm a big of pytest fixtures. They're so much better for setup and teardown
  compared to xunit style <code>setup</code>/<code>teardown</code> methods. Having
  a single method would force you to deal with multiple dependant objects in one
  place. And, especially for cleanup, the failure in one of those can mess up handling
  others if not enough care is taken. It was awful!
</p>

<p>
  pytest fixtures instead let us think about each dependency separately, and
  also only use them as needed by each individual test. They're essentially
  dependency injected into the test by name:
</p>

<Python
  source="import pytest

@pytest.fixture()
def some_number(self) -> int:
    return 42

def test_it_works(some_number: int):
    assert some_number == 42
"
/>

<p>
  with the ability to transparently make them context managers with specific
  cleanup
</p>

<Python
  source="import pytest
from my.code import Thing
import typing as tp

@pytest.fixture()
def a_thing(self) -> tp.Iterator[Thing]:
    with Thing() as thing:
        yield thing

def test_it_works(a_thing: Thing):
    assert a_thing.is_awesome
"
/>

<p>
  These are then found by pytest by traversing the scope outwards from the test.
  So if a test is on a class, then pytest will look at methods/attributes on the
  class, then at the module level of the file the test is in, then the
  conftest.py file of each package beyond that
</p>

<p>
  This means it's possible to put a fixture in a conftest.py file and it'll be
  discovered by any test below that conftest.py. This is useful to a point, but
  after a large enough codebase it can become difficult to track where fixtures
  come from.
</p>

<p>
  A pattern that I'm starting to like is where I have a factory that spits out a
  fixture and then I create that fixture at the top of the file where I use it
</p>

<Python
  source="from my.test_helpers import S3Pipeline

s3_pipeline = S3Pipeline.make_fixture()


def test_it_works(s3_pipeline: S3Pipeline):
    ...
    "
/>

<h2>A concrete example</h2>

<p>
  I wanted the other day to test that my Django template was getting href values
  from url arguments and displaying those. I also didn't want my test to have a
  specific root urlconf (it makes sense in context) and so I only cared that the
  correct url names/arguments were being used
</p>

<p>A simple naive solution would look like:</p>

<Python
  source="from unittest import mock
from django import urls

@mock.patch.object(urls, 'reverse')
def test_it_renders_buttons_correctly(reverse_mock: mock.Mock):
    def reverse_mock(*args, **kwargs) -> str:
        return repr(mock.call(*args, **kwargs))
    reverse_mock.side_effect = reverse_mock

    # Get the rendered html somehow
    rendered = ...

    soup = BeautifulSoup(rendered, 'lxml')
    button1 = soup.get(button, {'{'}'id': 'my-first-button'{'}'})
    assert button1 is not None
    assert button1.attrs['href'] == repr(
        mock.call('my-url-name', kwargs={'{'}'position': 'first'{'}'})
    )

    button2 = soup.get(button, {'{'}'id': 'my-second-button'{'}'})
    assert button2 is not None
    assert button2.attrs['href'] == repr(
        mock.call('my-url-name', kwargs={'{'}'position': 'second'{'}'})
    )
    "
/>

<p>We can do better by extracting that reverse mock</p>

<Python
  source="from unittest import mock
from unittest import mock
from django import urls
import typing as tp
import pytest

@pytest.fixture()
def reverse_mock() -> tp.Generator[mock.Mock, None, None]:
    with mock.patch.object(urls, 'reverse') as reverse_mock:
        def reverse_mock(*args, **kwargs) -> str:
            return repr(mock.call(*args, **kwargs))
        reverse_mock.side_effect = reverse_mock
        yield reverse_mock


def test_it_renders_buttons_correctly(reverse_mock: mock.Mock):

    # Get the rendered html somehow
    rendered = ...

    soup = BeautifulSoup(rendered, 'lxml')
    button1 = soup.get(button, {'{'}'id': 'my-first-button'{'}'})
    ...
    "
/>

<p>
  But if we want to put this mock in a global place, naming it meaningfully
  becomes important and tricky. It's much nicer to keep it local to where it's
  used, so that the dependency injection by name only retains enough meaning of
  what we actually want here
</p>

<p>
  So instead of making the fixture itself global, we make something that will
  return our fixture
</p>

<Python
  source="# test_helpers.py
from unittest import mock
from django import urls
import typing as tp
import pytest

def make_reverse_mock_fixture() -> tp.Callable[[], tp.Generator[mock.Mock, None, None]]:
    @pytest.fixture()
    def fixture() -> tp.Generator[mock.Mock, None, None]:
        with mock.patch.object(urls, 'reverse') as reverse_mock:
            def reverse_mock(*args, **kwargs) -> str:
                return repr(mock.call(*args, **kwargs))
            reverse_mock.side_effect = reverse_mock
            yield reverse_mock
    return fixture
    "
/>

<Python
  source="# test_stuff.py
from test_helpers import make_reverse_mock_fixture
from unittest import mock

reverse_mock = make_reverse_mock_fixture()

def test_it_renders_buttons_correctly(reverse_mock: mock.Mock):

    # Get the rendered html somehow
    rendered = ...

    soup = BeautifulSoup(rendered, 'lxml')
    button1 = soup.get(button, {'{'}'id': 'my-first-button'{'}'})
    ...
    "
/>

<p>
  One downside to this is we need to know the type that the fixture returns so
  we can type it in the signature to our test (nothing enforces that the type
  hint is correct, but giving the correct type hint helps with code completion
  and code jumping)
</p>

<p>
  A nice way to make it easier to type hint is to make it so that the fixture
  factory is on a class and the fixture gets us an instance of that class. That
  way we import one thing to make the fixture and type hint it
</p>

<Python
  source="# test_helpers.py
from unittest import mock
from django import urls
import typing as tp
import pytest

class ReverseResult:
    @classmethod
    def make_fixture(cls) -> tp.Callable[[], tp.Generator['ReverseResult', None, None]]:
        @pytest.fixture()
        def fixture() -> tp.Generator[ReverseResult, None, None]:
            with mock.patch.object(urls, 'reverse') as reverse_mock:
                def reverse_mock(*args, **kwargs) -> str:
                    return repr(mock.call(*args, **kwargs))
                reverse_mock.side_effect = reverse_mock
                yield cls()
        return fixture
    "
/>

<Python
  source="# test_stuff.py
from test_helpers import ReverseResult
from unittest import mock

reverse_result = ReverseResult.make_fixture()

def test_it_renders_buttons_correctly(reverse_result: ReverseResult):

    # Get the rendered html somehow
    rendered = ...

    soup = BeautifulSoup(rendered, 'lxml')
    button1 = soup.get(button, {'{'}'id': 'my-first-button'{'}'})
    ...
    "
/>

<p>
  The best part about doing this is now we can add multiple points of
  functionality to our fixture!
</p>

<Python
  source="# test_helpers.py
from unittest import mock
from django import urls
import typing as tp
import pytest

class ReverseResult:
    @classmethod
    def make_fixture(cls) -> tp.Callable[[], tp.Generator['ReverseResult', None, None]]:
        @pytest.fixture()
        def fixture() -> tp.Generator[ReverseResult, None, None]:
            with mock.patch.object(urls, 'reverse') as reverse_mock:
                def reverse_mock(*args, **kwargs) -> str:
                    return repr(mock.call(*args, **kwargs))
                reverse_mock.side_effect = reverse_mock
                yield cls()
        return fixture

    def __call__(self, *args: object, **kwargs: object) -> str:
        return repr(mock.call(*args, **kwargs))
    "
/>

<Python
  source="# test_stuff.py
from test_helpers import ReverseResult
from unittest import mock

reverse_result = ReverseResult.make_fixture()

def test_it_renders_buttons_correctly(reverse_result: ReverseResult):

    # Get the rendered html somehow
    rendered = ...

    soup = BeautifulSoup(rendered, 'lxml')
    button1 = soup.get(button, {'{'}'id': 'my-first-button'{'}'})
    assert button1 is not None
    assert button1.attrs['href'] == reverse_result(
        'my-url-name', kwargs={'{'}'position': 'first'{'}'}
    )
    "
/>

<h2>Separating functionality from fixture</h2>

<p>
  The above is cool and all, but now the functionality of <code
    >ReverseResult</code
  > is consumed by the fact that it's a fixture and this makes it difficult to get
  to that functionality if we aren't using it as a fixture!
</p>

<p>So let's make it such that make_fixture doesn't have any logic in it</p>

<Python
  source="# test_helpers.py
import typing as tp

class ReverseResult:
    @classmethod
    def make_fixture(cls) -> tp.Callable[[], tp.Generator['ReverseResult', None, None]]:
        @pytest.fixture()
        def fixture() -> tp.Generator[ReverseResult, None, None]:
            with cls() as instance:
                yield instance
        return fixture
    "
/>

<p>
  For this to work we need to also make our class a context manager. In Python a
  context manager is essentially an object that is compatible with pythons
  "with" syntax. The full documentation is over at <a
    href="https://docs.python.org/3/library/stdtypes.html#typecontextmanager"
    >the python docs</a
  >
  but essentially the object needs to implement <code>__enter__</code> and
  <code>__exit__</code>
</p>

<Python
  source="# test_helpers.py
from unittest import mock
import typing as tp
import types

class ReverseResult:
    patch: mock._patch

    @classmethod
    def make_fixture(cls) -> tp.Callable[[], tp.Generator['ReverseResult', None, None]]:
        @pytest.fixture()
        def fixture() -> tp.Generator[ReverseResult, None, None]:
            with cls() as instance:
                yield instance
        return fixture

    def __enter__(self) -> 'ReverseResult':
        self.patch = mock.patch.object(urls, 'reverse') 
        reverse_mock = self.patch.start()
        reverse_mock.side_effect = ...
        return self
    
    def __exit__(self, exc_type: type[BaseException], exc: BaseException, tb: types.TracebackType) -> None:
        if hasattr(self, 'patch'):
            self.patch.stop()
    "
/>

<p>
  This works, but it's kinda awful to split the cleanup over two methods like
  that. We can do better! The python standard library comes with a number of
  tools that make contextmanagers easier to make and work with. The first we'll
  use is the contextmanager decorator:
</p>

<Python
  source="from contextlib import contextmanager
from django import urls
import typing as tp

@contextmanager
def patch_reverse() -> tp.Generator[None, None, None]
    with mock.patch.object(urls, 'reverse') as reverse_mock:
        def reverse_mock(*args, **kwargs) -> str:
            return repr(mock.call(*args, **kwargs))
        reverse_mock.side_effect = reverse_mock
        yield
"
/>

<p>
  The second tool that can help us is the ExitStack. This is an object that lets
  us use the context manager without extra indentation
</p>
<p>
  <Python
    source="from contextlib import ExitStack

cm_stack = ExitStack()
try:
    cm_stack.enter_context(my_first_contextmanager())
    cm_stack.enter_context(my_second_contextmanager())

    # Do something now that those context managers are started
    ...
finally:
    # Exit all the context managers as if we opened them using 'with' statements
    cm_stack.close()
"
  />
</p>
<p>And we can combine the two</p>

<Python
  source="# test_helpers.py
from contextlib import ExitStack
from unittest import mock
import typing as tp
import types

class ReverseResult:
    def __init__(self):
        self.cm_stack = ExitStack()

    @classmethod
    def make_fixture(cls) -> tp.Callable[[], tp.Generator['ReverseResult', None, None]]:
        @pytest.fixture()
        def fixture() -> tp.Generator[ReverseResult, None, None]:
            with cls() as instance:
                yield instance
        return fixture

    @contextmanager
    def wrap_fixture(self) -> tp.Generator['ReverseResult', None, None]
        with mock.patch.object(urls, 'reverse') as reverse_mock:
            def reverse_mock(*args, **kwargs) -> str:
                return repr(mock.call(*args, **kwargs))
            reverse_mock.side_effect = reverse_mock
            yield

    def __enter__(self) -> 'ReverseResult':
        self.cm_stack.enter_context(self.wrap_fixture())
        return self
    
    def __exit__(self, exc_type: type[BaseException], exc: BaseException, tb: types.TracebackType) -> None:
        self.cm_stack.close()
    "
/>

<p>
  With a functional <code>typing.Self</code> you can also get rid of some of this
  boilerplate (I have yet to try this though)
</p>

<Python
  source="# test_helpers.py
from contextlib import ExitStack
from unittest import mock
import typing as tp
import types

class FixtureCM:
    def __init__(self):
        self.cm_stack = ExitStack()

    @contextmanager
    def wrap_fixture(self) -> tp.Generator[tp.Self, None, None]
        raise NotImplementedError()

    def __enter__(self) -> tp.Self:
        self.cm_stack.enter_context(self.wrap_fixture())
        return self
    
    def __exit__(self, exc_type: type[BaseException], exc: BaseException, tb: types.TracebackType) -> None:
        self.cm_stack.close()

class ReverseResult(FixtureCM)
    @classmethod
    def make_fixture(cls) -> tp.Callable[[], tp.Generator[tp.Self, None, None]]:
        @pytest.fixture()
        def fixture() -> tp.Generator[tp.Self, None, None]:
            with cls() as instance:
                yield instance
        return fixture

    @contextmanager
    def wrap_fixture(self) -> tp.Generator[tp.Self, None, None]
        with mock.patch.object(urls, 'reverse') as reverse_mock:
            def reverse_mock(*args, **kwargs) -> str:
                return repr(mock.call(*args, **kwargs))
            reverse_mock.side_effect = reverse_mock
            yield
    "
/>

<h2>Factories are flexible</h2>
<p>
  The last nice thing about this pattern is that factories are flexible, you can
  ask the factory to customize what it spits out!
</p>

<Python
  source="
class MyFixtureFactory(FixtureCM)
    def __init__(self, option1: int):
        super().__init__()
        self.option1 = option1

    @classmethod
    def make_fixture(cls, option1: int) -> tp.Callable[[], tp.Generator[tp.Self, None, None]]:
        @pytest.fixture()
        def fixture() -> tp.Generator[tp.Self, None, None]:
            with cls(option1) as instance:
                yield instance
        return fixture

    @contextmanager
    def wrap_fixture(self) -> tp.Generator[tp.Self, None, None]
        if self.option1 > 5:
            ...
        else:
            ...

fixture1 = MyFixtureFactory.make_fixture(1)
fixture2 = MyFixtureFactory.make_fixture(20)
    "
/>

<h2>Conclusion</h2>

<p>
  I really like this pattern. For the cost of some context manager tricks and a
  classmethod I get
</p>
<ul>
  <li>
    Names of fixtures don't need to be globally sensitive, which becomes more
    important the larger your collections of tests become
  </li>
  <li>Fixtures can be customized at point of use</li>
  <li>Fixtures are more straight forward to type hint</li>
  <li>
    Fixtures can provide multiple methods for the test to get specific
    functionality from
  </li>
  <li>
    Easier to see where fixtures are used and where they come from if they
    aren't globally available without intervention
  </li>
  <li>
    Easier to have multiple instances of the same fixture at the same time
  </li>
  <li>Easier to write tests for fixture logic (tests are code too!!)</li>
</ul>
