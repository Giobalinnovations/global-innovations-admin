'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';

import apiEndpoint from '@/services/apiEndpoint';
import { Loader2 } from 'lucide-react';
import TipTap from '@/components/ui/tip-tap';

import { slugConverter } from '@/lib/slugConverter';
import Tiptap from '@/components/tipTap/Tiptap';
import CategoryList from '../../../components/category-list';
import FileUploadMain from '../../../components/file-upload-main';
import { BlogsType } from '@/lib/type';
import useUpdate from '@/hooks/useUpdatePatchVisa';

const formSchema = z.object({
  category: z.string().min(1, { message: `category can't be empty` }),
  title: z.string().toLowerCase().min(2, {
    message: 'Title  must be at least 2 characters.',
  }),

  description: z.string().min(6, {
    message: 'Description must be at least 6 characters.',
  }),

  excerpt: z.string().min(6, {
    message: 'Excerpt must be at least 6 characters.',
  }),
  content: z.string().min(6, {
    message: 'content must be at least 6 characters.',
  }),

  slug: z
    .string()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'slug is not valid',
    }),
  imageCover: z
    .array(z.any())
    .nonempty({ message: 'Images cover is required' }),
  imageCoverAlt: z.string().min(3, {
    message: 'image cover alt must be at least 3 characters.',
  }),
  imageCoverCaption: z.string().min(3, {
    message: 'image cover alt must be at least 3 characters.',
  }),
  imageCoverDescription: z.string().min(3, {
    message: 'image cover alt must be at least 3 characters.',
  }),
  focusKeyword: z
    .string()
    .min(3, {
      message: 'focus keyword must be at least 3 characters.',
    })
    .optional()
    .or(z.literal('')),
});

export default function UpdateBlogsForm({
  id,
  blog,
}: {
  id: string;
  blog: BlogsType;
}) {
  const updateMutation = useUpdate({
    apiEndpointUrl: apiEndpoint.BLOGS,
    updateId: id,
    queryKey: ['getAllBlogs', 'getBlogById'],
    routeUrl: '/dashboard',
    successMessage: 'Blog updated successfully',
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',

    defaultValues: {
      category: blog.category,
      title: blog.title,
      description: blog.description,
      excerpt: blog.excerpt,
      content: blog.content,
      focusKeyword: blog.focusKeyword,
      imageCoverAlt: blog.imageCoverAlt,
      imageCoverCaption: blog.imageCoverCaption,
      imageCoverDescription: blog.imageCoverDescription,
      slug: blog.slug,
      imageCover: [
        {
          preview: blog.imageCover,
        },
      ],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        if (
          value.every(item => item instanceof Blob || typeof item === 'string')
        ) {
          value.forEach(item => formData.append(key, item));
        } else {
          formData.append(key, JSON.stringify(value));
        }
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    updateMutation.mutate(formData);
    form.control._reset();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            // disabled={true}
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={blog.category}
                  disabled={true}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Blog Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <CategoryList notAvailableMessage="no category found please click here to create your first blog category" /> */}
                    <SelectItem value={blog.category} className="capitalize">
                      {blog.category}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="meta title..."
                    {...field}
                    // onChange={event =>
                    //   field.onChange(event.target.value.toLowerCase())
                    // }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="meta description..."
                    {...field}
                    // onChange={event =>
                    //   field.onChange(event.target.value.toLowerCase())
                    // }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="excerpt..."
                    {...field}
                    // onChange={event =>
                    //   field.onChange(event.target.value.toLowerCase())
                    // }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              // old tip tap
              // <FormItem>
              //   <FormLabel>Content</FormLabel>
              //   <FormControl>

              //     <TipTap {...field} />

              //   </FormControl>

              //   <FormMessage />
              // </FormItem>

              // new tip tap

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Tiptap {...field} />
                      {/* <Tiptap /> */}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="slug..."
                    {...field}
                    onChange={event =>
                      field.onChange(
                        slugConverter(event.target.value.toLowerCase())
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* file upload main */}
          <FileUploadMain
            form={form}
            fieldName="imageCover"
            uploadLabel="Add your cover image"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <FormField
              control={form.control}
              name="imageCoverAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image Alt</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cover image alt..."
                      {...field}
                      // onChange={event =>
                      //   field.onChange(event.target.value.toLowerCase())
                      // }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageCoverCaption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image Caption</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cover image caption..."
                      {...field}
                      onChange={event =>
                        field.onChange(event.target.value.toLowerCase())
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageCoverDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cover image description..."
                      {...field}
                      // onChange={event =>
                      //   field.onChange(event.target.value.toLowerCase())
                      // }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="focusKeyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Focus Keyword</FormLabel>
                <FormControl>
                  <Input
                    placeholder="focus keyword..."
                    {...field}
                    onChange={event =>
                      field.onChange(event.target.value.toLowerCase())
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* test tipatap code end here */}
          {updateMutation.isError ? (
            <div className="text-red-500">
              An error occurred:{' '}
              {updateMutation?.error['response']?.data?.error ??
                'something goes wrong'}
            </div>
          ) : null}
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className={`${updateMutation.isPending ? 'opacity-50' : ''}`}
          >
            {' '}
            {updateMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Loading
              </>
            ) : (
              'Update Blogs'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
