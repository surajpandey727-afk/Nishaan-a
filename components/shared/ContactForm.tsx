'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/field'
import { ErrorState } from '@/components/ui/states'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Posts to /api/contact. That route is stubbed until Resend credentials are
 * present, so the form is safe to ship before the integration is switched on.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(response.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-card border border-line bg-ox-raise px-8 py-12">
        <h2 className="text-h3 font-bold">Message received</h2>
        <p className="mt-3 max-w-measure text-muted">
          We reply to every enquiry within two working days. If it is urgent, call the number on the
          left and say so.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Full name" />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" autoComplete="organization" placeholder="Optional" />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
      </div>

      <div>
        <Label htmlFor="message">What are you trying to decide?</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="A paragraph is plenty. The more specific the question, the more useful the first call."
        />
      </div>

      {status === 'error' && (
        <ErrorState body="The message did not send. Email team@nishaan-a.com directly, or try again in a moment." />
      )}

      <Button type="submit" variant="solid" withArrow disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending' : 'Send message'}
      </Button>
    </form>
  )
}
