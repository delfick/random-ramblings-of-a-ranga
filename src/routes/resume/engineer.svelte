<script lang="ts" context="module">
  export const prerender = true;
</script>

<script>
  import { onMount } from "svelte";
  import { dedent } from "ts-dedent";

  import ResumeSections from "./_components/resume_sections.svelte";
  import ResumeSection from "./_components/resume_section.svelte";
  import SummaryPoints from "./_components/summary_points.svelte";
  import SummaryPoint from "./_components/summary_point.svelte";
  import HomeLink from "./_components/home_link.svelte";
  import Contact from "./_components/contact.svelte";
  import Resume from "./_components/resume.svelte";
  import Blurb from "./_components/blurb.svelte";
  import Title from "./_components/title.svelte";

  onMount(() => {
    document.body.className = "light";
  });
</script>

<HomeLink />

<Resume>
  <HomeLink inline />

  <Title hide_overflow>Senior Software Engineer</Title>

  <Blurb
    source={dedent`
    I'm a senior software engineer with 11 years of industry experience who is
    passionate about using software to solve real problems. I have a history of
    finding challenges that can be assisted with automation and building tools
    that do just that.

    In my career I have touched a range of problem areas including data pipelines,
    simple Web services, performance profiling and optimisation of high load
    services, tooling used by warehouse workers, asynchronously interacting with
    IoT hardware over local and remote networks; and creation and maintenance of
    an internal portal for user information. As well as interacting with third
    party developers, infrastructure and tooling for testing, application
    deployment, and cloud sysadmin activities.

    I have also developed a focus on how I work to ensure what I build matches the
    constraints of the problems they aim to help with; and also don't lead to a
    maintenance burden over time. I am comfortable spreading these techniques to
    my colleagues so we can all benefit from thinking about software in a way that
    lets us have confidence in our changes.

    I'm interested in finding a work environment that encourages pragmatism when
    it comes to how we work, what we work on, and how technical debt is bought,
    managed, and paid back.
            `}
  />
  <ResumeSections>
    <SummaryPoints>
      <SummaryPoint>
        Over 16 years experience with Python as of 2022
      </SummaryPoint>
      <SummaryPoint>Over 11 years industry experience as of 2022</SummaryPoint>
      <SummaryPoint>Over 8 years focus on server/cloud operations</SummaryPoint>
      <SummaryPoint>Extremely comfortable with Git and scripting</SummaryPoint>
      <SummaryPoint>
        Experience with AWS and GCE cloud environments
      </SummaryPoint>
      <SummaryPoint>
        Experience in a microsystem environment backed by GCE managed K8S
      </SummaryPoint>
      <SummaryPoint>
        History and interest in building tools that become invaluable to my
        colleagues
      </SummaryPoint>
      <SummaryPoint>Approachable, available, honest and helpful</SummaryPoint>
      <SummaryPoint>
        Highly pragmatic and understands when compromises need to be made
      </SummaryPoint>
      <SummaryPoint>
        Ready and willing to call out concerns early so we can avoid problems
      </SummaryPoint>
    </SummaryPoints>
    <ResumeSection
      title="Desired work"
      title_color="#b019ae"
      source={dedent`
    I want my job to be about enabling people. I have experience in cloud
    infrastructure operations that has given me a strong understanding of the
    difference between running software locally, on CI, and in a deployed
    environment. I have lots of experience in taking a project and "shuffling"
    the code so that it becomes possible to expand it's feature set without
    buying unmanageable technical debt. All my experience is within small
    teams that have a wide range of responsibilities and I have seen the cost
    of different leadership and prioritisation approaches.

    I really enjoy and have passion for doing what I can to make it easier to
    do the technical parts of our job so that my colleagues can focus on the
    business problem itself.
    `}
    />
    <ResumeSection
      title="Approach"
      title_color="#b019ae"
      source={dedent`
    I'm very quick at creating solutions and part of that is understanding
    what should be built.

    I make a conscious effort to be available, approachable and honest.
    Creating a good experience is not limited to creating magic code
    and throwing it over the fence! Effectively helping users involves
    being able to offer guidance through debugging strange behaviour with
    the product and knowing who in the business is appropriate to ask when
    more insight is required.

    I have strong opinions about how to make software and try my best to cater
    my methods to the way my autistic brain works. I believe that agile rituals
    are useful tools that should be adjusted to better suit the team rather
    than the team changed to better suit the rituals. Context of a situation
    will always be the most important factor in deciding how a team should
    operate, and a foundation of openness, honesty and good faith combined with
    a desire to reflect and improve will always lead to a productive and happy
    team.

    I also advocate for approaches to describing and deploying software changes
    that let us ship quality code faster and with confidence.
    `}
    />
    <ResumeSection
      title="Language Skills"
      title_color="#b019ae"
      source={dedent`
    I'm most comfortable with Python, which I've been using for around 15
    years. I am proficient with JavaScript, am comfortable with Typescript and
    have a a passable ability to create web GUIs using React and Redux.
    I built applications for the cloud using Go and gRPC for most of the 5
    years I was at LIFX. And at Papercut I found an appreciation for modern PHP.
    
    I have worked with Ruby before and whilst I enjoy the language I never got
    into the ecosystem to any large extent. Though I sometimes use some ruby
    language features when I write pseudo code, which is a weird combination
    of python, ruby and English.

    My background in operations work means I have a strong grasp of using bash,
    and the terminal in general. These skills and an ability to find the right
    tool for the job has meant that I'm known for delivering value quickly.

    When it comes to databases I have a reasonable understanding of SQL and
    tend to favour Postgres and sqlite. However when it comes to maintaining
    a Postgres cluster, I'm much more comfortable when I have access to people
    who can provide guidance.
    `}
    />
    <ResumeSection
      title="Learning Style"
      title_color="#b019ae"
      source={dedent`
    I have found that I learn best when I have a need for the skill or
    technology that I'm trying to gain. This means I tend not to dedicate time
    to research just for the sake of knowledge. For example I attempted to
    learn Rust but because I had no need for it I couldn't find the motivation
    to continue that. It did seem interesting though!

    In the Photons framework I mentioned above, it was very clear very early
    on that using Python async/await would be very useful and this is around
    the time that Python 3.5 just came out. And so over those 5 years I
    created a number of patterns and utilities for working with await/async and
    how it behaves. This knowledge was not only fun and interesting to learn
    but enabled me to write Photons in a way that is maintainable and scales
    at run time.

    My understanding of Redux Saga comes from finding Redux Thunk difficult
    to scale and in my search for an alternative I decided Saga would be much
    better and incorporated that into those projects instead.

    I learnt TypeScript and modern PHP as part of uplifting old code at
    Papercut and along with learning type hints in Python I have a large
    appreciation for how type annotations can be used to help clarify code
    for humans and the computer.

    I find this approach lets me to get the most out of the skills I pick up;
    and for the technologies I don't personally know it's usually easy to find
    someone who can provide opinion or guidance.
    `}
    />
    <ResumeSection
      title="Notable examples: Deployment Tooling"
      print_breakable
      title_color="#228c8c"
      source={dedent`
    The first job where I provided a significant amount of tooling in the
    workplace led me to creating a number of deployment tools and then using
    them to make a consistent deployment pattern for all the applications in
    my line of business.

    I made these projects while I was embedded in the realcommercial.com.au
    team as operations support including a large amount of this time where I
    was the only person doing operations for around 20 engineers across
    Melbourne and Xi'an.

    Years later in my role at Papercut I developed a system that would stand up the development
    setup for technical and non technical people who added to our systems. This
    system meant we could make changes to how the development system was setup
    and after running \`./update.sh\` users of the system would be able to run their
    local setup with those changes.


    I have found over my career that having a functional local setup that mirrors
    functionality shortens the development feedback cycle and is very powerful when
    combined with a staging environment that mirrors production infrastructure.
    `}
    />
    <ResumeSection
      title="Notable examples: Business wide tooling"
      title_color="#228c8c"
      source={dedent`
    When I worked with Smart Light bulbs, my primary focus was developing
    applications that sit in our GCP kubernetes cluster but my passion led me
    to creating a large framework of functionality that could interact with
    devices offline for everything they can do. This codebase became the
    defacto second implementation of all the functionality in the consumer
    mobile apps and factory code. I also built 10 applications on top of that
    foundation. Code from this project sat in the cloud, was used by support,
    used in the warehouse, used by sales and used by all engineer teams to
    interact with our devices during development. Alongside this in a different
    code base I have created and maintained a vital part of the factory pipeline.

    This codebase included over 137 thousand lines of python and was
    almost entirely being written by me. There's too many features to list here
    but I'm most proud of my "fake device" which is an implementation of the
    protocol behaviour. This means we could experiment with protocol changes
    before being implemented in firmware, as well as spin up any kind of
    product from the command line without needing that hardware. We also
    used these to run smoke tests against the LIFX cloud and ensure everything
    worked correctly.
    
    I find a lot of energy and motivation in these efforts to make it easier
    for my colleagues (and myself!) to do their jobs. I also have an open source
    version of this project ([photons.delfick.com](https://photons.delfick.com))
    that I own and exists on my personal github. I would use this as an
    unofficial implementation of our LAN protocol when I interacted with our
    third party developers as I often did on the LIFX community forums and the
    LIFX subreddit.
    `}
    />
    <ResumeSection
      title="Notable examples: Other projects"
      title_color="#228c8c"
      source={dedent`
    I believe that as a software engineer my job requires a lot more than
    typing, but the programming part is definitely the most fun and so
    outside of work I have played with a number of things.
    
    Included in these projects are tools for making the process of writing
    tests easier; data transformation; fast decryption of gpg packets;
    and a number of older projects that taught me about how to
    structure large programs. These exist on my Github profile at
    https://github.com/delfick and I'd love to walk through those and
    explain their history and functionality.

    Since late 2020 I have considerably less time for these side projects but
    it is something I enjoy to do every so often.
    `}
    />
    <Contact
      source={dedent`
    You can find out more about me on my linkedIn profile at
    https://www.linkedin.com/in/delfick and I welcome a discussion over email
    at [opportunities@delfick.com](mailto:opportunities@delfick.com).
    `}
    />
  </ResumeSections>
</Resume>
