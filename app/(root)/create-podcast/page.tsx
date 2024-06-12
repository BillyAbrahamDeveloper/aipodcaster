// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { useState } from 'react';
// import { Loader } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Label } from '@radix-ui/react-label';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { cn } from '@/lib/utils';
// import { Textarea } from '@/components/ui/textarea';
// import GeneratePodcast from '@/components/GeneratePodcast';
// import GenerateThumbnail from '@/components/GenerateThumbnail';
// import { Id } from '@/convex/_generated/dataModel';

// const voiceCategories = ['Alloy', 'Shimmer', 'Nova', 'Echo', 'Fable'];

// const formSchema = z.object({
//   podcastTitle: z.string().min(2),
//   podcastDescription: z.string().min(2),
// });

// const CreatePodcast = () => {
//   const [imagePrompt, setImagePrompt] = useState('');
//   const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(
//     null
//   );
//   const [imageUrl, setImageUrl] = useState('');

//   const [audioUrl, setAudioUrl] = useState('');
//   const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(
//     null
//   );
//   const [audioDuration, setAudioDuration] = useState(0);

//   const [voiceType, setVoiceType] = useState<string | null>(null);
//   const [voicePrompt, setVoicePrompt] = useState('');

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       podcastTitle: '',
//       podcastDescription: '',
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import GeneratePodcast from '@/components/GeneratePodcast';
import GenerateThumbnail from '@/components/GenerateThumbnail';
import { Loader } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const CreatePodcast = () => {
  const router = useRouter();
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState('');

  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(
    null
  );
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPodcast = useMutation(api.podcasts.createPodcast);

  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: '',
      podcastDescription: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!audioUrl || !imageUrl || !voiceType) {
        toast({
          title: 'Please generate audio and image',
        });
        setIsSubmitting(false);
        throw new Error('Please generate audio and image');
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      });
      toast({ title: 'Podcast created' });
      setIsSubmitting(false);
      router.push('/');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  }

  return (
    <section className=' flex flex-col mt-10'>
      <h1 className='text-20 font-bold text-white-1'>Create Podcast AI</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col mt-12'
        >
          <div className='flex flex-col gap-[30px] border-b border-black-5 pb-10 '>
            <FormField
              control={form.control}
              name='podcastTitle'
              render={({ field }) => (
                <FormItem className=' flex flex-col gap-2.5'>
                  <FormLabel className=' text-16 text-white-1 font-bold'>
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=' input-class focus-visible:ring-orange-1 '
                      placeholder='Podcast AI '
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className=' text-white-1' />
                </FormItem>
              )}
            />

            <div className=' flex  flex-col gap-2.5'>
              <Label className='text-16 font-bold text-white-1'>
                Select AI Voice
              </Label>

              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    'text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-orange-1'
                  )}
                >
                  <SelectValue placeholder='Choose AI Voice' />
                </SelectTrigger>
                <SelectContent className='text-16 border-none  bg-black-1 focus:ring-orange-1 text-white-1'>
                  {voiceCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className=' capitalize focus:bg-orange-1'
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className=' hidden'
                  />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name='podcastDescription'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2.5'>
                  <FormLabel className='text-16 font-bold text-white-1'>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className='input-class focus-visible:ring-orange-1'
                      placeholder='Write a short podcast description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-white-1' />
                </FormItem>
              )}
            />
          </div>

          <div className=' flex flex-col pt-10 '>
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail />

            <div className='mt-10 w-full '>
              <Button
                type='submit'
                className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 duration-500 transition-all hover:bg-black-1 hover:border-orange-1 hover:border hover:text-orange-1'
              >
                {isSubmitting ? (
                  <div className=' flex  gap-2'>
                    <>Submitting....</>
                    <Loader size={20} className=' animate-spin' />
                  </div>
                ) : (
                  <>Submit & Publish Podcast</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};
export default CreatePodcast;
