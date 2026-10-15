# Lesson 10: Build the sales website

- Source: https://higgsfield.ai/academy/courses/claude-higgsfield-ai-ad-agency/build-the-sales-website
- Lesson video: https://d2245ubjcvacnx.cloudfront.net/assets/claude-higgsfield-ai-ad-agency__build-the-sales-website__video__lesson-video.ff635657.mp4
- Captured: 2026-10-15

## Lesson review

The website expert in the video describes a sales page as a conversation with the buyer. His structure is simple: five blocks that answer five questions, followed by the same next action.

The review turns a vague website request into five buyer questions and one repeated call to action.

Block| Buyer’s question| Content  
---|---|---  
Hero| What is this, and is it for me?| Audience, outcome, offer, and an honest reason for the introductory price  
Work| Can they do it?| Playable portfolio videos  
Process| What do I have to do?| The information the buyer supplies and what happens next  
Benefits| What do I get?| Benefits you can support with evidence  
FAQ| What might stop me?| The buyer’s real objections  
  
Place the same free-sample call to action after each block. Repetition is useful here because the buyer may be convinced by a different part of the page.


The website expert introducing the five-block structure.

## Give Claude a complete brief

**Prompt (copy this asset):**

Build a responsive five-block sales page for [offer], aimed at [niche]. Hero: state what we do, who it's for, and the outcome, with the offer and an honest reason for the introductory price (e.g. a launch price for the first clients). Work: embed the portfolio videos so they play on the page. Process: explain the few quick questions the buyer answers and what the system handles. Benefits: include only verified benefits; do not claim there are no extra costs unless the offer truly has none. FAQ: answer the real objections this buyer raises. Repeat one free-sample call to action after every block. Send every form submission to a protected admin view for human review, and validate all input.

The generated page in the video does not follow its own brief. It changes the free-sample CTA to “GET A FREE ROOF CHECK” and labels synthetic media “CUSTOMER TESTIMONIAL.” Correct both before using the page.


The generated page with a mismatched call to action and a synthetic clip labeled as a customer testimonial.

## Test the funnel, not only the page

The source shows a test request appearing in a lead inbox. That proves one submission arrived; it does not prove that the admin route is protected or that every path works.


A test request in the generated site’s lead inbox.

Before sharing the link:

  * play every portfolio video to the end;
  * click every CTA and confirm it opens the same form;
  * submit one marked test request and check that it appears once;
  * verify an unauthenticated visitor cannot open the admin route;
  * test the page at phone width;
  * submit invalid data and confirm it is rejected without leaking private fields into the page or URL.

A live URL is the beginning of the test, not the result.
