---
layout: about
title: Get Involved
description: Want to contribute? Any release of Arizona Bootstrap is tested and ready to use, but improvements to the framework are in everyone's best interest.
group: about
redirect_from:
  - "/about/"
  - "/docs/2.0/about/"
toc: true
---

If you want to get involved, you can:

<ul>
  <li>Request access to join the discussion on Slack (see below)</li>
  <li>Participate in Friday meetings and Wednesday pull request review sessions (ask for more details in Slack)</li>
  <li>Submit pull requests on GitHub</li>
</ul>

Questions, bug reports or suggestions can also be emailed to [uadigital@email.arizona.edu](mailto:uadigital@email.arizona.edu) or (preferably!) reported on Slack.

## Join Our Meetings

Arizona Digital hosts weekly meetings on Wednesdays and Fridays. Wednesday meetings are held on Zoom and dedicate the entire hour to reviewing and merging pull requests on [GitHub]({{< docsref "/about/get-involved#review-or-contribute-code" >}}). Friday meetings are hosted in-person in UITS-116 (and can also be joined remotely via Zoom) and dedicate two hours to reviewing and merging pull requests, and covering topics concerning Drupal 8. For more details, connect with us on Slack on our `#friday-meetings` channel.

## Connect with Us on Slack

The Arizona Digital team utilizes a variety of Slack channels ranging from general discussions to specific repos and products. You are welcome to join any and all of these channels. Below you will find all of our Slack channels and a description of the channel's purpose.

<strong>To connect with us on Slack, you must first <a href="{{< param slack >}}" target="_blank">request access to the UArizona workspace</a>.</strong> Once added, you can join any of the channels listed below.

<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Channel</th>
      <th scope="col">Purpose</th>
    </tr>
  </thead>
  {{< slackchannels.inline >}}
  <tbody>{{ range (index .Site.Data "slack-channels") }}
    <tr{{if eq .channel "#friday-meetings" }} class="table-success"{{ end }}>
      <td>{{ .channel }}</td>
      <td>
        <ul>{{ range .description }}
          <li>{{ .purpose }}</li>{{- end }}
        </ul>
      </td>
    </tr>{{- end }}
  </tbody>
  {{< /slackchannels.inline >}}
</table>

## Review or Contribute Code

Arizona Digital currently uses utilizes GitHub to host and review code contained in Git repositories, and formerly used Bitbucket. Our repos are public and can be easily cloned if you want to contribute or review code. Below you will find all of our code repositories (with a link) and a description of the repo's contents.

<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Repo Name</th>
      <th scope="col">Contents</th>
    </tr>
  </thead>
  {{< sourcerepos.inline >}}
  <tbody>{{ range (index .Site.Data "sourcecode-repos") }}
    <tr>
      <td><a href="{{ .link }}" target="_blank">{{ .name }}</a></td>
      <td>{{ .description }}</td>
    </tr>{{ end }}
  </tbody>
  {{< /sourcerepos.inline >}}
</table>

## Submit or Work on a Ticket

Arizona Digital utilizes GitHub Projects to handle issue tracking for its products. If you want to contribute, you can check the backlog and claim an unassigned ticket you want to work on. Or, if you have a specific issue that isn't already created, you can create a new ticket and work on it.
