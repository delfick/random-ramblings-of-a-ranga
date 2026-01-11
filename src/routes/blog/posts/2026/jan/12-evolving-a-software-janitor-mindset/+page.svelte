<style lang="postcss">
  @reference "tailwindcss";

  .emphasised-list {
    @apply m-0! border-s-4 border-l-4 border-orange-800 pl-6! md:pl-12;

    p:first-of-type {
      @apply pt-1! leading-none;
    }

    ul {
      @apply pl-4;
    }

    :global(body.dark) {
      @apply border-orange-100!;
    }
  }
</style>

<script lang="ts">
  import Emphasis from '@blog/emphasis.svelte'
</script>

<p>
  I’ve always liked the idea of treating software like it’s a garden. But outside of the
  computer I know extremely little about gardening! So, I like to call myself a software
  janitor [compliment]. To me, within a software context, that means I take code that
  already works and I make it age better. Another emphasis for this idea, is that I call
  myself a framework developer, as opposed to an application developer. I can get by
  making a reasonable algorithm, but my strength is more thinking about high level data
  and logic flow, then it is about actually making the software achieve something.
</p>
<p>
  And to be clear, the only thing that matters is that the software actually does
  something! Could be the cleanest code with the perfect levels of cohesion and coupling
  with flexibility and still not actually do anything useful and be a waste of space and
  resources.
</p>
<p>
  In large scale commercial software you need a lot of different people holding onto
  different things as their focus and priority. For me,
  <Emphasis>
    my most important thing is how high level technical and social architecture and
    rituals can be used to make it easier to create software that is reliable, correct,
    available, and debuggable.
  </Emphasis>
  It’s relatively easy to ensure these things at the point code is written, but it’s a very
  different thing to ensure these properties remain over a long period of time across many different
  authors and changing requirements.
</p>
<p>
  I’ve got my career to a place where I have a very specific niche expertise in devEx
  (developer experience), specifically in thinking about what it means to write millions
  of lines of Python. For the past 1.5 years my full time position has, to a large extent,
  been about being a productivity multiplier to 100s of Python developers across multiple
  timezones in a multi million line Django monolith, and since the end of 2025, I’m now in
  this role as a Staff Engineer.
</p>
<p>
  So this post is me writing down my thoughts about what that means to me and what’s
  important in my eyes to that role. I imagine it’ll be like my one blog post last year
  where this is a ramble of where my thoughts start for the year and they’ll evolve as I
  prioritise more time towards practise!
</p>

<h2>Maintainability is not a static property of the code</h2>
<p>
  There’s a lot of foundational computer science behind what we do as software engineers,
  but using a programming language is a lot more than its syntax and grammar, it’s also
  the culture, ecosystem and history around the language itself, and what makes sense to a
  developer who is familiar with one ecosystem will not make sense to a developer familiar
  with a different ecosystem.
</p>
<p>
  Plus, outside of that, different people process information differently! For me the way
  my brain processes information means that it is simple software design to emphasise
  flexible and capable mechanisms that handle tricky complexity and is able to defer
  decisions; whereas a different person thinks that’s more complicated because these
  mechanisms become a concentration of complexity.
</p>
<p>
  Software Architecture is a manifestation of how humans think about a problem. How easy
  those choices are to work with should not be thought of as orthogonal to the human
  working with it, just as much as they should not be thought of as orthogonal as the
  problem space being worked with.
</p>
<p>
  So, while I agree it can be useful to track the state of the software (and its growth)
  and use that information to make decisions, we should not fool ourselves into thinking
  classic “developer productivity” metrics show us any kind of universal truth. In my
  opinion, to do so is to mistakenly believe the human experience is a monolith and can be
  ignorant of the real world context that software exists in.
</p>

<h2>What is maintainability?</h2>

<p>The only constant in life is that nothing is constant!</p>

<div class="emphasised-list">
  <p>Maintability to me can be summarised as the following three properties:</p>

  <ul class="tight-list">
    <li><p>The code can be understood</p></li>
    <li><p>The code can be changed without undesirable changes in behaviour</p></li>
    <li><p>Undesirable behaviour can be noticed and understood</p></li>
  </ul>
</div>

<p>
  The goal is for code to be maintainable in the long term, which implies that these
  properties are true in a way that is, and stays, viable in terms of budget, schedule and
  training.
</p>
<p>
  So, to create maintainable software, is to understand, predict and react to changes over
  time in personnel, requirements, and technology.
</p>

<h2>Enablement teams</h2>
<p>
  Like the term “devex”, I think our industry is still defining what “enablement” is. I
  see developer experience as an enablement role just like I see platform engineers,
  security engineers, exploratory QA, database specialists, and other support teams inside
  and outside “tech” specific functions, as enablement teams.
</p>
<p>
  With the caveat that this categorisation doesn’t have hard boundaries, enablement teams
  don’t exist without the application developers and the application developers have a
  much more distracted time without enablement teams!
</p>
<p>
  I think about the scrum concept of velocity not as a function of how quickly cards are
  closed, but rather as a function of how often a team revisits functionality that should
  already be fulfilling requirements. This is why green field projects tend to have higher
  velocity, because it’s simpler to do less things! But we can’t ever have large projects
  if our solution is to always start fresh.
</p>
<p>
  I also believe the idea of a full stack developer is a myth used by companies to hire
  less people, and we should, as an industry, recognise that awareness is not the same as
  expertise. It’s important that we don’t create silos and we should encourage everyone to
  be interested in other parts of the codebase and business. But developing the
  functionality is a different skillset to building the
  infrastructure/architecture/reality that code exists in, and
  <Emphasis>
    in large companies we shouldn’t expect people to take on and handle multiple areas of
    expertise. It’s how you end up with burnt out people, and it creates business
    continuity risks.
  </Emphasis>
</p>
<p>
  I feel it’s very easy for Developer Experience as a concept to fall into the same trap
  that happened with “DevOps” in the way that term was used as a buzzword. Where people
  incorrectly think it’s a field constrained just to tooling or configuring CI.
</p>
<p>
  I see the role of devEx teams as about making sure application developers are able to
  carry out their work without being distracted by unrelated rabbit holes.
</p>
<p>
  Which isn’t about treating application developers like sensitive cave people who only
  know how to hit things with a club and grunt! It’s about a collaborative and
  bidirectional effort to understand and improve their workflows, their tools, and the
  code they work with.
</p>

<div class="emphasised-list">
  <p>So our “jurisdiction” as such is the custodians of</p>

  <ul>
    <li>Developer advocacy</li>
    <li>Process improvement</li>
    <li>Unblocking developers</li>
    <li>Design consultation</li>
    <li>Mechanics of dependency management</li>
    <li>Linter management</li>
    <li>Code Conventions</li>
  </ul>
</div>

<p>
  And the word custodian is important. We are a support structure. We can and do enact
  changes in code, tooling and process, but the priority should always be to empower
  developers rather than hide or gatekeep these responsibilities. Buy-in is important for
  a consistent application of thought, and buy-in requires active involvement.
</p>

<h2>Software is a social sport, not a technical one</h2>
<p>
  Writing instructions for computers is fundamentally a human endeavour: we create purpose
  and function that is desirable to humans and there’s no point creating automation for a
  task that has no purpose or function.
</p>
<p>
  Humans determine what the purpose is and what behaviour is desired. And again, the human
  experience is not a monolith, so getting correct requirements in the first place, and
  then correctly communicating those requirements to others, and then correctly verifying
  those requirements have been met and continue to be met, is the majority of what we do.
  And it’s the thing our industry is historically not good at.
</p>
<p>
  There’s a number of ways our industry is good at requirements gathering and they get
  talked about a lot. I’m often more of a “point out the problems” person, so what I’ll
  say here is there is also a bunch of reasons it’s hard to perform requirements
  gathering: poor leadership, known and unknown blindspots, known and unknown bias, the
  way reality interacts with existing technical and social architecture, unequal
  distribution of knowledge, unequal distribution of information, and I’m sure multiple
  other factors. Especially unhelped by the recent pervavise idea that we can skip effort
  and just recombine everything that was published on the open web before 2022 for
  everything that we will need to do in the future.
</p>

<h2>How to be a productivity multiplier with reach?</h2>
<p>
  The question becomes what do I actually do with this foundation of thought? I’m only one
  human, so I can’t fix every problem as an individual! My career has led to being what I
  call a general purpose interruptible engineer: someone who is available to interruptions
  by developers seeking help and support. I’m very good at coming in without full context
  and helping with the technical aspects of using Python to make the computer do what we
  want. But I’m reaching a limit of how many I can help with this approach and I need to
  figure out the next step.
</p>
<p>
  So with the goal of “I work for a company doing something I believe in and I wish
  success for”, my goal becomes “How can I use my influence and ideas to make that success
  more likely, and stronger?”.
</p>

<div class="emphasised-list">
  <p>
    The position I sit in means these are the questions that I think any software shop
    should be keeping in mind for themselves:
  </p>
  <ul>
    <li>How is information distributed and consumed?</li>
    <li>How does the business incentives/decisions shape architecture?</li>
    <li>
      How does architecture shape the way business incentives/decisions are interpreted
      and acted on?
    </li>
    <li>How is information transformed by a game of telephone?</li>
    <li>
      What is the difference between what the engineers want to do, are told to do, and
      are capable of doing?
    </li>
    <li>
      What are the problems the engineers can see, and how can we bridge the gap between
      what those problems are in reality, and what the engineers think those problems are.
    </li>
  </ul>
</div>

<p>
  I have some answers to these questions, but those thoughts become too specific to my
  employer for this post.
</p>
<p>
  But the point of having a wider impact is, by definition, to reach a lot of people. And
  to reach a lot of people is to understand, work with, and shape the distribution and
  comprehension of information. The message that is spread is important, but that message
  is irrelevant if no-one hears or understands it!
</p>
<p>
  I also clearly need to figure out how to make space for other people to do the more
  direct interruptible engineer work I’ve been doing for the last year, and grow some more
  software janitors. Writing software is difficult and it’s just so much easier when you
  have supportive people to lend a hand in difficult moments.
</p>
