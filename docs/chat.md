can the same domain point to different servers at the same time?
Yes. The same domain can point to multiple servers at the same time. This is commonly achieved through DNS records and is used for load balancing, high availability, and distributing traffic.

There are several ways to achieve this.

1. Multiple A records (DNS round-robin)
You can configure multiple IP addresses for the same domain.

For example:

Record

Type

Value

example.com

A

192.168.1.10

example.com

A

192.168.1.20

example.com

A

192.168.1.30

When someone visits example.com, DNS can return multiple IP addresses. The client's resolver chooses which address to connect to.

DNS resolution

example.com

DNS returns multiple IP addresses

Server 1

Server 2

Server 3

Note that DNS round-robin doesn't guarantee equal traffic distribution or health checking.

2. Load balancer / reverse proxy
You can point your domain to a single load balancer, which distributes incoming requests across multiple backend servers.

For example:

example.com

DNS points to load balancer IP

Load Balancer (Nginx / HAProxy)

Server A

Backend 1

Server B

Backend 2

This gives you more control over:

Traffic distribution.

Health checks and failover.

Sticky sessions.

SSL termination.

Routing based on application rules.

3. Different subdomains pointing to different servers
You can also use different subdomains for different servers.

Domain

Server

Purpose

example.com

Server A

Main website

api.example.com

Server B

Backend API

admin.example.com

Server C

Admin dashboard

files.example.com

Server D

File storage

4. Same domain, different servers based on geographic location
Using GeoDNS or an intelligent DNS provider, you can resolve the same domain to different servers depending on the visitor's geographic location.

For example:

Nigerian visitors → Server in Africa.

US visitors → Server in North America.

European visitors → Server in Europe.

Which approach should you use?
Requirement

Recommended approach

Distribute traffic across servers

Load balancer

Simple distribution

Multiple A records

Different applications

Subdomains

Geographic distribution

GeoDNS / CDN

High availability

Load balancer with health checks

One important distinction: If your goal is to host the same domain on two different hosting providers simultaneously (for example, Hostinger and a VPS), that is possible using multiple A records or a load balancer.

Are you trying to achieve multiple independent deployments under the same domain, or distribute traffic between multiple servers running the same application?

how can i setup my static website form to submit to superbase and get a notification in my mail
You can achieve this with Supabase + Supabase Edge Functions + Resend.

The architecture is straightforward:

A visitor fills out a form on your static website.

The form submits the data to Supabase.

Supabase stores the submission in a PostgreSQL table.

An Edge Function sends an email notification to you.

You receive an email whenever someone submits the form.

You don't need a traditional backend server. Supabase Edge Functions handle the server-side operations.

Recommended architecture

Static website

HTML / CSS / JavaScript

Supabase Edge Function

Validate and process submission

Supabase DB

Store submissions

Resend

Send email notification

Your email inbox

New form submission notification

Step 1. Create your Supabase table
In Supabase, open SQL Editor and execute:

create table public.contact_submissions (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    message text not null,
    created_at timestamptz default now()
);

-- Prevent direct public access to submissions
alter table public.contact_submissions
enable row level security;

We'll let the Edge Function handle database insertion, so you don't need to expose database write permissions to the public.

Step 2. Set up Resend for email notifications
Resend Logo Vector File Download | Logowik
Resend

Email delivery API

Visit Resend
Resend allows your backend to send emails programmatically.

Create an account.

Add and verify your domain.

Generate an API key.

Choose an email address on your verified domain as the sender.

For example:

Sender: notifications@yourdomain.com

Recipient: you@gmail.com

You can use Resend's API directly from your Supabase Edge Function. 

Supabase Docs
+1

Step 3. Create a Supabase Edge Function
You can create one using the Supabase CLI:

supabase functions new contact

Create the following function in:

supabase/functions/contact/index.ts


import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://yourdomain.com",
  "Access-Control-Allow-Headers": "content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim() ||
      name.length > 120 ||
      email.length > 254 ||
      message.length > 5000
    ) {
      return Response.json(
        { error: "Invalid form data" },
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Save submission
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

    if (dbError) throw dbError;

    // Send email notification
    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        },
        body: JSON.stringify({
          from: Deno.env.get("RESEND_FROM"),
          to: [Deno.env.get("NOTIFY_EMAIL")],
          subject: "New website contact submission",
          text: `
New form submission

Name: ${name}
Email: ${email}

Message:
${message}
          `,
        }),
      }
    );

    if (!emailResponse.ok) {
      console.error("Email delivery failed:", await emailResponse.text());

      return Response.json(
        { success: true, notification: "failed" },
        { status: 200, headers: corsHeaders }
      );
    }

    return Response.json(
      { success: true },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to process submission" },
      { status: 500, headers: corsHeaders }
    );
  }
});

Replace https://yourdomain.com with your actual website origin. For local development, allow your localhost origin as well.

Step 4. Configure your environment variables
In Supabase Dashboard, navigate to:

Edge Functions → Secrets

Add these secrets:

Name

Value

SUPABASE_URL

Your Supabase project URL

SUPABASE_SERVICE_ROLE_KEY

Your Supabase service role key

RESEND_API_KEY

Your Resend API key

RESEND_FROM

notifications@yourdomain.com

NOTIFY_EMAIL

Your email address

The service role key and Resend API key must remain server-side. Never put them in your HTML or JavaScript. 

Supabase Docs
+2

Deploy the function:

supabase functions deploy contact --no-verify-jwt

This makes the endpoint publicly callable, so add rate limiting and CAPTCHA protection before using it in production.

Your endpoint will look like:

https://YOUR_PROJECT_REF.supabase.co/functions/v1/contact
Step 5. Connect your static HTML form
You don't need a framework or build process. You can use ordinary HTML and JavaScript.

Example HTML:


<form id="contact-form">
  <input
    type="text"
    name="name"
    placeholder="Your name"
    required
  />

  <input
    type="email"
    name="email"
    placeholder="Your email"
    required
  />

  <textarea
    name="message"
    placeholder="Your message"
    required
  ></textarea>

  <button type="submit">Send message</button>

  <p id="form-status"></p>
</form>

<script>
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = form.querySelector("button");
  button.disabled = true;
  status.textContent = "Sending...";

  const formData = new FormData(form);

  try {
    const response = await fetch(
      "https://YOUR_PROJECT_REF.supabase.co/functions/v1/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message")
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Submission failed");
    }

    status.textContent = result.notification === "failed"
      ? "Message saved, but email notification failed."
      : "Message sent successfully!";

    form.reset();

  } catch (error) {
    status.textContent = error.message || "Something went wrong.";
  } finally {
    button.disabled = false;
  }
});
</script>

Replace YOUR_PROJECT_REF with your actual Supabase project reference.

That's it. Your static website can now submit form data to Supabase and trigger an email notification.

Step 6. Test the workflow
Verify these four things:


Form submission reaches your Edge Function.

A new record appears in contact_submissions.

Resend successfully sends the notification.

The notification arrives in your inbox.
Also test invalid inputs, repeated submissions and email delivery failures. For production, add CAPTCHA or another bot-protection mechanism and rate limiting.

A few production considerations
CORS: Update the function's CORS headers to include:

"Access-Control-Allow-Methods": "POST, OPTIONS",
"Access-Control-Allow-Headers": "apikey, content-type",

Also add the following header to your frontend fetch request:

"apikey": "YOUR_SUPABASE_PUBLISHABLE_KEY"

A publishable key is safe to expose in frontend code; a service role key is not.

Spam protection: CORS alone does not prevent automated requests. Add CAPTCHA and server-side rate limiting.

Email delivery: A successful database insertion doesn't guarantee successful email delivery. Consider retrying failed notifications rather than losing them.

Email templates: You can later use HTML templates to make notifications look more professional.

Official documentation
Supabase Edge Functions

Supabase email integration with Resend

Supabase Row Level Security

Resend API documentation

My recommendation: Use this Edge Function approach rather than connecting your static website directly to the database and trying to send emails from browser JavaScript. It keeps your credentials secure, centralizes validation, and gives you room to add more functionality later.





