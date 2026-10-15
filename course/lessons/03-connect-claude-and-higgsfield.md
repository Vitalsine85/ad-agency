# Lesson 3: Connect Claude and Higgsfield

- Source: https://higgsfield.ai/academy/courses/claude-higgsfield-ai-ad-agency/connect-claude-and-higgsfield
- Lesson video: https://d2245ubjcvacnx.cloudfront.net/assets/claude-higgsfield-ai-ad-agency__connect-claude-and-higgsfield__video__lesson-video.ca049449.mp4
- Captured: 2026-10-15

## Lesson review

At this point Claude already has the niche and offer. Connecting Higgsfield lets the same conversation request media generation, but the connector does not make the brief accurate or the output approved. You still own those decisions.

## Add the connector from the current setup page

Open the official Higgsfield MCP page and copy the connector URL shown there. In Claude, open **Customize → Connectors** , add a custom connector named Higgsfield, paste the URL, and connect it.

[Open Higgsfield MCP setup](https://higgsfield.ai/mcp)


Claude’s custom-connector dialog before the Higgsfield URL is entered.

The source video shows the general flow, but labels and endpoints can change. Use the current setup page rather than copying a URL from an old screenshot.

## Read the permissions

A remote MCP server is a third-party service with tools and data access. Review the authentication and permission screens, enable only the tools this workflow needs, and keep consequential actions behind approval. Anthropic’s [remote MCP guidance](https://support.anthropic.com/en/articles/11175166-about-custom-integrations-using-remote-mcp) explains the trust boundary in more detail.

Test with disposable content. Do not put client data into the first request, and do not grant a broad “always allow” permission while you are still checking the connection.

## Prove the round trip

Ask for one short test generation. The connection works only when Claude returns something you can open: a playable file, a result URL, or a generation ID that resolves to media.

**[Connected]**

**[Not yet proven]**

Claude returns a media result. You open it and confirm that it plays.

Claude writes a prompt or says the task is complete, but returns no usable asset.

Save the test result ID or URL with your setup notes. If nothing playable comes back, fix the connector before sending a batch.
