'use client';

import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { Textarea } from './ui/textarea';
import { Loader } from 'lucide-react';
import { GenerateThumbnailProps } from '@/types';
import { Input } from './ui/input';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { useAction, useMutation } from 'convex/react';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuidv4 } from 'uuid';

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);

  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);

  // handling upload to storage and get access fucntion
  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({ title: `Thumbnail generated successfully` });

      //
    } catch (error) {
      console.log(error);
      toast({ title: `Error: ${error}`, variant: 'destructive' });
    }
  };
  // Generating Image using Open AI  dall-e-3
  const generateImage = async () => {
    try {
      const response = await handleGenerateThumbnail({ prompt: imagePrompt });
      const blob = new Blob([response], { type: 'image/png' });
      handleImage(blob, `thumbnail-${uuidv4}`);
    } catch (error) {
      console.log(error);
      toast({ title: `Error: ${error}`, variant: 'destructive' });
    }
  };

  // Calling here handleImage function
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;

      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({ title: `Error: ${error}`, variant: 'destructive' });
    }
  };

  return (
    <>
      <div className='generate_thumbnail flex flex-col'>
        <Button
          className={cn('', {
            'bg-black-6  text-center w-full gap-4 ': isAiThumbnail,
          })}
          type='button'
          onClick={() => setIsAiThumbnail(true)}
          variant='plain'
        >
          Use AI to generate content
        </Button>

        <Button
          className={cn('', {
            'bg-black-6  text-center w-full gap-4 ': !isAiThumbnail,
          })}
          type='button'
          onClick={() => setIsAiThumbnail(false)}
          variant='plain'
        >
          Upload custom Image
        </Button>
      </div>
      <div className=''></div>
      {isAiThumbnail ? (
        <div className='flex flex-col gap-5 mt-6'>
          <div className=' flex flex-col gap-2.5'>
            <Label className='text-16 font-bold text-white-1'>
              AI Prompt to generate AI Podcast
            </Label>
            <Textarea
              className='input-class font-light focus-visible:ring-orange-1'
              placeholder='Provide text to generate thumbnail '
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className='mt-5 w-full max-w-[200px] '>
            <Button
              type='submit'
              className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 '
              onClick={generateImage}
            >
              {isImageLoading ? (
                <div className=' flex  gap-2'>
                  <>Generating....</>
                  <Loader size={20} className=' animate-spin' />
                </div>
              ) : (
                <>Generate</>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className='image_div' onClick={() => imageRef?.current?.click()}>
          <Input
            type='file'
            className=' hidden'
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />

          {!isImageLoading ? (
            <div className=' flex flex-col  items-center gap-2 justify-center'>
              <Image
                src={'/icons/upload-image.svg'}
                width={40}
                height={40}
                alt='upload'
              />

              <div className='flex flex-col items-center gap-1'>
                <h2 className='text-12 font-bold text-orange-1'>
                  Click to upload
                </h2>
                <p className='text-12 font-normal text-gray-1'>
                  SVG, PNG, JPG, or GIF (max. 1080x1080px)
                </p>
              </div>
            </div>
          ) : (
            <div className='flex  items-center gap-3 text-gray-1 font-medium text-16 '>
              <>Generating....</>
              <Loader size={20} className=' animate-spin' />
            </div>
          )}
        </div>
      )}

      {image && (
        <div className='flex-center w-full'>
          <Image
            src={image}
            width={200}
            height={200}
            className='mt-5'
            alt='thumbnail'
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
