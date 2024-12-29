<script>
  import { onMount } from "svelte";
  import { dedent } from "ts-dedent";

  import SubResumeSection from "@resume/sub_resume_section.svelte";
  import ResumeSections from "@resume/resume_sections.svelte";
  import ResumeSection from "@resume/resume_section.svelte";
  import SummaryPoints from "@resume/summary_points.svelte";
  import SummaryPoint from "@resume/summary_point.svelte";
  import HomeLink from "@resume/home_link.svelte";
  import Contact from "@resume/contact.svelte";
  import Resume from "@resume/resume.svelte";
  import Blurb from "@resume/blurb.svelte";
  import Title from "@resume/title.svelte";

  onMount(() => {
    document.body.className = "light";
  });
</script>

<HomeLink />

<Resume>
  <HomeLink inline />

  <Title hide_overflow>Senior Software DevEx Engineer</Title>

  <Blurb
    source={dedent`
    I'm a senior software developer experience engineer with over 13 years of
    industry experience (as of 2024) who is passionate about writing software
    that ages well.

    My career has been defined by two tracks: the day to day tasks that
    I'm assigned; and improving the technical productivity of my colleagues.

    Over this time I have worked as a Software developer before embarking
    on a detour into the sysadmin/cloud operations space for nearly a decade
    before returning as a developer and moving towards the devEx space.

    In my career I have touched a range of problem areas including data
    pipelines, Web services, tooling used by warehouse workers, interacting
    with IoT hardware over local and remote networks, creation and
    maintenance of web-based internal portals for user information, activities
    around bringing software into deployed environments, interacting with
    third party developers, and paying back technical debt in large codebases.

    I have also developed a focus on how I work to ensure what I build
    matches the constraints of the problems they aim to help with; and also
    don't lead to a maintenance burden over time. I have reached a level of
    seniority where I enjoy and seek out opportunities to pass on these
    techniques and attitudes to others to increase the quality of the software
    we are all working on.

    I'm interested in finding a work environment that encourages pragmatism
    when it comes to how we work, what we work on, and how technical debt is
    bought, managed, and paid back.
            `}
  />
  <ResumeSections>
    <SummaryPoints>
      <SummaryPoint>
        Over 18 years experience with Python as of 2024
      </SummaryPoint>
      <SummaryPoint>Over 13 years industry experience as of 2024</SummaryPoint>
      <SummaryPoint>Over 8 years focus on server/cloud operations</SummaryPoint>
      <SummaryPoint>Extremely comfortable with Git and scripting</SummaryPoint>
      <SummaryPoint>
        Experience with AWS and GCE cloud environments
      </SummaryPoint>
      <SummaryPoint>Well defined software philosophy and approach</SummaryPoint>
      <SummaryPoint>
        History and interest in building tools/processes that become invaluable
        to my colleagues
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
      print_breakable
      title_color="#b019ae"
      source={dedent`
    I want my job to be about enabling people. I have experience in cloud
    infrastructure operations that has given me a strong understanding of the
    difference between running software locally, on CI, and in a deployed
    environment. I have lots of experience in taking a project and "shuffling"
    the code **so that it becomes possible to expand it's feature set without
    buying unmanageable technical debt**. Most of my experience is within small
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
    **Creating a good experience is not limited to creating magic code
    and throwing it over the fence!** Effectively helping users involves
    being able to offer guidance through debugging strange behaviour with
    the product and knowing who in the business is appropriate to ask when
    more insight is required.

    I have strong opinions about how to make software and try my best to cater
    my methods to the way my autistic brain works. I believe that agile rituals
    are useful tools that should be adjusted to better suit the team rather
    than the team changed to better suit the rituals. **Context of a situation
    will always be the most important factor in deciding how a team should
    operate**, and a foundation of openness, honesty and good faith combined with
    a desire to reflect and improve will always lead to a productive and happy
    team.

    I also advocate for approaches to describing and deploying software changes
    that let us ship quality code faster and with confidence.
    `}
    />
    <ResumeSection
      title="Language Skills"
      print_breakable
      title_color="#1938b0"
      source={dedent`
    I'm most comfortable with Python, which I've been using for around 18
    years. I am proficient with JavaScript and have a passable ability to create
    web GUIs using React/Svelte/Vue.

    I built applications for the cloud using Go and gRPC for most of the 5
    years I was at LIFX.    

    My background in operations work means I have a strong grasp of using bash,
    and the terminal in general. These skills and an ability to find the right
    tool for the job has meant that I'm known for delivering value quickly.

    My time at Octopus/Kraken has been defined by a deep interest in using Python
    in a large codebase with a focus on using static types effectively
    and I have spent a lot of effort in developing techniques for safely refactoring
    code.
    `}
    />
    <ResumeSection
      title="Learning Style"
      title_color="#1938b0"
      source={dedent`
    I have found that **I learn best when I have a need** for the skill or
    technology that I'm trying to gain. This means I tend not to dedicate time
    to research just for the sake of knowledge. 

    In the Photons framework I mention below, it was very clear very early
    on that using Python async/await would be very useful and this is around
    the time that Python 3.5 just came out. And so over those 5 years I
    created a number of patterns and utilities for working with await/async and
    how it behaves. This knowledge was not only fun and interesting to learn
    but enabled me to write Photons in a way that is maintainable and scales
    at run time.

    I learnt TypeScript and modern PHP as part of uplifting old code at Papercut.

    And my efforts to improve the static typing maturity at Octopus/Kraken has
    given me a deep understanding of how to use mypy effectively. **I have a large
    appreciation for type annotations** helping us clarify the code
    for humans and the computer.

    I find this approach lets me to get the most out of the skills I pick up;
    and for the technologies I don't personally know it's usually easy to find
    someone who can provide opinion or guidance.
    `}
    />
    <ResumeSection
      title="Notable examples"
      title_color="#228c8c"
      print_breakable
    >
      <SubResumeSection
        title="Paying back technical debt"
        source={dedent`
        Within my role inside the internal developer experience team at Kraken
        I have successfully led the effort to get a codebase containing millions
        of lines of python onto the latest version of mypy. This required
        co-ordinating and delivering a very high number of prefactors over 1.5
        years to safely get from a very old version of mypy to the latest version.

        This work involved also work to upgrade Django, creating a mypy plugin
        to solve a problem that was causing many 100s of errors, making decisions
        around what could be safely ignored and ensuring required changes to the
        codebase were merged as we went along to mitigate risks around a "big
        bang" change.

        Upon reaching the latest version, the effort has turned towards using
        the features we now have access to for the purpose of getting 100%
        typing coverage in the codebase.
        `}
      />
      <SubResumeSection
        notoppadding
        title="Deployment Tooling"
        source={dedent`
        A large part of my time at realcommercial.com.au was spent embedded as the
        **single person for deployment support for around 20 engineers** across
        Melbourne and Xi'an. In this time I created three tools in particular: a
        docker client, a cloudformation management tool, and a general aws
        synchronisation tool built with boto.

        I used these tools to create a consistent and understandable deployment
        pattern that let me manage a large workload and enabled my colleagues
        to focus on what they were building instead of how to get it out the door.
        `}
      />
      <SubResumeSection
        title="Development system"
        source={dedent`
        Years later in my role at Papercut I developed a system that would stand
        up the development setup for technical and non technical people who added
        to our systems. This system meant we could make changes to how the
        development system was setup and after running \`./update.sh\` users
        of the system would be able to run their local setup with those changes.

        Having the ability to stand up a local system that lets the developer
        focus on the functionality of the system without being distracted by
        the operational reality of running code in the cloud allows a tight
        feedback loop on making the code perform it's functional requirements.

        When paired with a staging environment that clones the infrastructure of
        production, **we can can discover and resolve the vast majority of edge
        cases and bugs with a high level of confidence** before code sees production
        use.
        `}
      />
      <SubResumeSection
        title="Business wide tooling"
        source={dedent`
        When I worked with Smart Light bulbs, my primary focus was developing
        applications that sit in our GCP kubernetes cluster but my passion led me
        to creating a large framework of functionality that could interact with
        devices. **This codebase became the defacto second implementation of all
        the functionality** in the consumer mobile apps and factory code. I also
        built 10 applications on top of that foundation. Code from this project
        sat in the cloud, was used by support, used in the warehouse, used by
        sales and used by all engineer teams to interact with our devices during
        development.

        This codebase included over 137 thousand lines of python (including the
        10 applications and over 60 thousand lines of tests) and was essentially
        entirely written by me. There's too many features to list here
        but I'm most proud of my "fake device" which allowed us to **emulate the
        behaviour of different hardware/firmware** versions of the product range
        without having specific hardware or even before firmware changes have
        been implemented. This code also powered some basic smoke tests that
        would constantly check that devices could connect to the cloud and be
        controlled.
        
        I find a lot of energy and motivation in these efforts to make it easier
        for my colleagues (and myself!) to do their jobs. I also have an open source
        version of this project ([photons.delfick.com](https://photons.delfick.com))
        that I own and exists on my personal github. I would use this as an
        unofficial implementation of our LAN protocol when I interacted with our
        third party developers as I often did on the LIFX community forums and the
        LIFX subreddit.

        Alongside this in a different code base I created and maintained a vital
        part of the factory pipeline.
        `}
      />
    </ResumeSection>
    <Contact
      source={dedent`
    You can find out more about me on my linkedIn profile at
    https://www.linkedin.com/in/delfick and I welcome a discussion over email
    at [opportunities@delfick.com](mailto:opportunities@delfick.com).
    `}
    />
  </ResumeSections>
</Resume>
