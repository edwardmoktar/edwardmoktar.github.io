import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Award } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  reason: z.string().min(1, 'Please select a reason for contact'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const contactReasons = [
  { value: 'collaboration', label: 'Collaboration Opportunity' },
  { value: 'consulting', label: 'Consulting Request' },
  { value: 'hiring', label: 'Job Opportunity' },
  { value: 'other', label: 'Other' },
];

const socialLinks = [
  { 
    icon: Mail, 
    label: 'Email',
    href: 'mailto:edward@example.com',
    color: 'text-red-500'
  },
  { 
    icon: Github, 
    label: 'GitHub',
    href: 'https://github.com/edwardm',
    color: 'text-gray-700 dark:text-gray-300'
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/edwardm',
    color: 'text-blue-600'
  },
  { 
    icon: Twitter, 
    label: 'Twitter',
    href: 'https://twitter.com/edwardm',
    color: 'text-blue-400'
  },
];

export default function Contact() {
  const [showBadge, setShowBadge] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      reason: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real app, you would send this to your backend
    console.log('Form submitted:', values);
    
    // Show success message
    toast({
      title: "Message sent successfully!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    // Show achievement badge
    setShowBadge(true);
    setTimeout(() => setShowBadge(false), 5000);

    // Reset form
    form.reset();
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Let's Connect</h1>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Contact</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {contactReasons.map((reason) => (
                              <SelectItem key={reason.value} value={reason.value}>
                                {reason.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project or inquiry..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              <div className="grid gap-6">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors ${link.color}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="font-medium">{link.label}</span>
                    </motion.a>
                  );
                })}
              </div>

              <div className="bg-accent/5 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">Office Location</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>Singapore</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badge */}
          <AnimatePresence>
            {showBadge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 50 }}
                className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Achievement Unlocked!</p>
                    <p className="text-sm">First Contact Made 🎉</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
