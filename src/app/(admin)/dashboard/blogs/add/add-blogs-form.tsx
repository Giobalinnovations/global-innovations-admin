'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import FileUploadMain from '../../components/file-upload-main';
import usePost from '@/hooks/usePost';
import apiEndpoint from '@/services/apiEndpoint';
import { Loader2, Trash2, Wand2 } from 'lucide-react';
import CategoryList from '../../components/category-list';
import { slugConverter } from '@/lib/slugConverter';
import OptionalText from '../../components/optional-text';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';

const formSchema = z.object({
  category: z.string().min(1, { message: `category can't be empty` }),
  title: z.string().toLowerCase().min(2, {
    message: 'Title  must be at least 2 characters.',
  }),

  description: z.string().min(6, {
    message: 'Description must be at least 6 characters.',
  }),

  heading: z.string().min(6, {
    message: 'Heading must be at least 6 characters.',
  }),

  keywords: z.string().optional(),

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
  faqs: z.array(
    z.object({
      question: z.string().min(1, { message: 'Question is required' }),
      answer: z.string().min(1, { message: 'Answer is required' }),
    })
  ),
});

export default function AddBlogsForm() {
  const postMutation = usePost({
    apiEndpointUrl: apiEndpoint.BLOGS,
    queryKey: 'getAllBlogs',
    routeUrl: false,
    successMessage: 'Blog created successfully',
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      category: '',
      title: '',
      description: '',
      excerpt: '',
      content: '',
      focusKeyword: '',
      imageCoverAlt: '',
      imageCoverCaption: '',
      imageCoverDescription: '',
      slug: '',
      imageCover: [],
      faqs: [],
      heading: '',
      keywords: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'faqs',
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

    postMutation.mutate(formData);
    form.control._reset();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue=""
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Blog Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <CategoryList notAvailableMessage="no category found please click here to create your first blog category" />
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
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading (H1)</FormLabel>
                <FormControl>
                  <Input placeholder="heading..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Keywords (comma separated) <OptionalText />
                </FormLabel>
                <FormControl>
                  <Input placeholder="keywords..." {...field} />
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

          {/* old content editor */}
          {/* <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Tiptap {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          /> */}

          {/* new content editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Type your content here..."
                    autofocus={true}
                    editable={true}
                    editorClassName="focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="slug..."
                      {...field}
                      onChange={event =>
                        field.onChange(
                          slugConverter(event.target.value.toLowerCase())
                        )
                      }
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const title = form.getValues('title');
                      if (title) {
                        field.onChange(slugConverter(title));
                      }
                    }}
                    title="Generate slug from title"
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>
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

          <div>
            <h3 className="text-lg font-semibold mb-2">FAQs</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 mb-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`faqs.${index}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter FAQ question" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`faqs.${index}.answer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter FAQ answer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove FAQ
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ question: '', answer: '' })}
            >
              Add FAQ
            </Button>
          </div>

          {postMutation.isError ? (
            <div className="text-red-500">
              An error occurred:{' '}
              {postMutation?.error['response']?.data?.error ??
                'something goes wrong'}
            </div>
          ) : null}
          <Button
            type="submit"
            disabled={postMutation.isPending}
            className={`${postMutation.isPending ? 'opacity-50' : ''}`}
          >
            {' '}
            {postMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Loading
              </>
            ) : (
              'Add Blogs'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
