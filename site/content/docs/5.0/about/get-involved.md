---
layout: docs
title: Get Involved
description: Want to contribute? All releases of Arizona Bootstrap are tested and ready to use, but improvements to the framework are in everyone's best interest.
group: about
toc: true
---

If you want to get involved with Arizona Bootstrap, you can:

<ul>
  <li>Join our Arizona Digital discussions in Slack</li>
  <li>Join our weekly Arizona Digital meetings</li>
  <li>Contribute to issues and pull requests on GitHub</li>
</ul>


## Join our Discussions in Slack

The Arizona Digital team uses Slack channels with a variety of purposes, ranging from general discussion to topics about specific repos and products. You are welcome to join any and all of these channels.

<strong>To connect with us in Slack, you must first <a href="https://quickstart.arizona.edu/join-us-on-slack" target="_blank">request access to the University of Arizona Slack workspace</a>.</strong> Once you have access, you can join any of the channels listed below.

### Primary Arizona Digital Channels

<div class="primary-channels-table">
  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th scope="col">Channel</th>
        <th scope="col">Purpose</th>
      </tr>
    </thead>
    {{< slackchannels.inline >}}
      <tbody>
        {{ $slackChannels := index $.Site.Data "slack-channels" }}
        {{- range $slackChannel := where $slackChannels "primary" "eq" true -}}
          <tr>
            <td>{{ $slackChannel.channel }}</td>
            <td>
              <ul class="ps-3">{{ range $slackChannel.description }}
                <li>{{ .purpose }}</li>{{- end }}
              </ul>
            </td>
          </tr>
        {{- end }}
      </tbody>
    {{< /slackchannels.inline >}}
  </table>
</div>

Please feel free to post questions, bug reports, and suggestions to the **#azdigital-support** channel. We are also available by email at [az-digital@web.arizona.edu](mailto:az-digital@web.arizona.edu).

### Additional Channels of Interest

<div id="additional-channels-table">
  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th scope="col">Channel</th>
        <th scope="col">Purpose</th>
      </tr>
    </thead>
    {{< slackchannels.inline >}}
      <tbody>
        {{ $slackChannels := index $.Site.Data "slack-channels" }}
        {{- range $slackChannel := where $slackChannels "primary" "ne" true -}}
          <tr>
            <td>{{ $slackChannel.channel }}</td>
            <td>
              <ul class="ps-3">{{ range $slackChannel.description }}
                <li>{{ .purpose }}</li>{{- end }}
              </ul>
            </td>
          </tr>
        {{- end }}
      </tbody>
    {{< /slackchannels.inline >}}
  </table>
</div>


## Join Arizona Digital Meetings

Arizona Digital hosts weekly meetings on Wednesdays and Fridays. All meetings are held on Zoom.

On Wednesdays, we meet in the morning for an hour to review pull requests from our [projects in GitHub](https://github.com/orgs/az-digital/projects?query=is%3Aopen%3Ftype%3Dnew&query=is%3Aopen+sort%3Atitle-asc). In the afternoon, we host an open-ended workshop for topics we generally set in advance. On Friday mornings, we meet for two hours to announce updates from the week, review issues and pull requests, and discuss topics related to Arizona Digital development.

For the schedule and Zoom link for our meetings, please join our **#azdigital-meetings** channel and view the channel topic at the top.


## Contribute to our GitHub Projects

Arizona Digital uses [GitHub Projects](https://github.com/orgs/az-digital/projects) to manage issue tracking for its products. To contribute, you can check for open issues and claim an unassigned ticket you want to work on. Or, if the issue you're interested in hasn't been created yet, you can create a new issue and assign yourself to it. For more details about working on Arizona Bootstrap, see the [Contributing documentation]({{< param repo >}}/blob/v{{< param current_version >}}/CONTRIBUTING.md).

Code for Arizona Digital projects is contained in our [GitHub repositories]({{< param github_org >}}). (We formerly used Bitbucket for UA Bootstrap.) Our repos are public and can be cloned if you want to contribute or review code. Below are links to our main code repositories.

<div id="source-repos-table">
  <table class="table table-striped mb-4">
    <thead class="table-dark">
      <tr>
        <th scope="col">Repository</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="{{< param repo >}}" target="_blank">arizona-bootstrap</a></td>
        <td>Source code for the Arizona-branded version of Bootstrap and its docs site</td>
      </tr>
      <tr>
        <td><a href="{{< param az_quickstart >}}" target="_blank">az_quickstart</a></td>
        <td>Source code for the Arizona-branded Drupal distribution (Quickstart)</td>
      </tr>
      <tr>
        <td><a href="{{< param github_org >}}/az-icons" target="_blank">az-icons</a></td>
        <td>Supplementary icon set for the University of Arizona</td>
      </tr>
    </tbody>
  </table>
</div>
