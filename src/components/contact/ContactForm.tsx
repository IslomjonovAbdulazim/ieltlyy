"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success("Message sent (demo)");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-xl rounded-xl border p-6">
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-black">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-black">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium text-black">Message</label>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" className="min-h-[140px]" />
      </div>
      <Button onClick={submit} disabled={loading} className="bg-[var(--brand-primary)] text-white">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </div>
  );
};

export default ContactForm;