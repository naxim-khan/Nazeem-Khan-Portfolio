import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import Spinner from './Spinner';
import { MdDeleteForever } from "react-icons/md";
import 'react-markdown-editor-lite/lib/index.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import 'react-markdown-editor-lite/lib/index.css';
import Head from "next/head";

export default function Project({
    _id,
    title: existingTitle,
    slug: existingSlug,
    images: existingImages,
    description: existingDescription,
    client: existingClient,
    projectcategory: existingProjectCategory,
    tags: existingTags,
    livepreview:existingLivePreview,
    status: existingStatus,
}) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [client, setClient] = useState(existingClient || '');
    const [projectcategory, setProjectCategory] = useState(existingProjectCategory || []);
    const [tags, setTags] = useState(existingTags || []);
    const [livepreview, setLivePreview] = useState(existingLivePreview || '');
    const [status, setStatus] = useState(existingStatus || '');

    // Track if slug is manually edited
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    // For images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = useRef([]); // Use useRef to persist across renders

    /**
     * Helper function to generate a slug from a given text
     */
    function generateSlug(text) {
        return text
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove invalid characters
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .replace(/--+/g, '-');    // Replace multiple hyphens with single hyphen
    }

    /**
     * Automatically generate slug when the title changes,
     * unless the slug has been manually edited.
     */
    function handleTitleChange(ev) {
        const newTitle = ev.target.value;
        setTitle(newTitle);

        if (!isSlugManuallyEdited) {
            const newSlug = generateSlug(newTitle);
            setSlug(newSlug);
        }
    }

    /**
     * Update slug manually and mark it as manually edited
     */
    function handleSlugChange(ev) {
        const inputSlug = ev.target.value;
        const formattedSlug = generateSlug(inputSlug);
        setSlug(formattedSlug);

        // If the user modifies the slug, mark it as manually edited
        if (formattedSlug !== generateSlug(title)) {
            setIsSlugManuallyEdited(true);
        }

        // Optional: Reset manual edit flag if slug matches auto-generated slug
        if (formattedSlug === generateSlug(title)) {
            setIsSlugManuallyEdited(false);
        }
    }

    /**
     * Handle blog creation or update
     */
    async function createBlog(ev) {
        ev.preventDefault();

        if (isUploading) {
            try {
                await Promise.all(uploadImagesQueue.current);
            } catch (error) {
                toast.error('Image upload failed. Please try again.');
                return;
            }
        }

        const data = { title, slug, images, description,client, projectcategory, tags, livepreview, status };
        console.log('Submitting project data:', data); // Debugging

        try {
            if (_id) {
                const response = await axios.put('/api/projects', { ...data, _id });
                console.log('PUT response:', response.data); // Debugging
                toast.success('Project updated successfully!');
            } else {
                const response = await axios.post('/api/projects', data);
                console.log('POST response:', response.data); // Debugging
                toast.success('Project created successfully!');
            }
            setRedirect(true);

        } catch (error) {
            console.error('Error creating/updating Project:', error);
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    /**
     * Handle image uploads
     */
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                // Push the promise to the queue
                const uploadPromise = axios.post('/api/upload', data)
                    .then(res => {
                        console.log('Image upload response:', res.data);  // Inspect the response structure
                        if (Array.isArray(res.data)) {  // Ensure response is an array of URLs
                            setImages(oldImages => [...oldImages, ...res.data]);  // Add URLs to state
                        } else if (typeof res.data === 'string') { // If response is a single URL string
                            setImages(oldImages => [...oldImages, res.data]);
                        } else {
                            console.error('Unexpected response format: ', res.data);
                            toast.error('Unexpected response format during image upload');
                        }
                    })
                    .catch(err => {
                        console.error('Upload failed', err);
                        toast.error('Image upload failed');
                    });

                uploadImagesQueue.current.push(uploadPromise);
            }

            // Wait for all uploads to finish
            await Promise.all(uploadImagesQueue.current);

            setIsUploading(false);
            toast.success("Images Uploaded");

            // Clear the queue after uploads
            uploadImagesQueue.current = [];
        } else {
            toast.error('No files selected');
        }
    }

    // Redirect after successful creation/update
    if (redirect) {
        router.push('/projects');
        return null;
    }

    /**
     * Update the order of images after sorting
     */
    function updateImagesOrder(updatedImages) {
        setImages(updatedImages);
    }

    /**
     * Handle deletion of an image
     */
    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('Image Deleted Successfully!');
    }

    return <>
        
        <Head>
            <title>Add Project</title>
        </Head>

        <form className='addWebsiteform' onSubmit={createBlog}>
                {/* Project Title */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        placeholder='Enter Project title.'
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                {/* Project Slug */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor='slug'>Slug (SEO-friendly URL)</label>
                    <input
                        type='text'
                        id='slug'
                        placeholder='Enter slug URL'
                        value={slug}
                        onChange={handleSlugChange}
                        required
                    />
                </div>

                {/* Project client Name */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor='client'>Client Name</label>
                    <input
                        type='text'
                        id='client'
                        placeholder='Enter client Name'
                        value={client}
                        onChange={ev=> setClient(ev.target.value)}
                        required
                    />
                </div>

                {/* Project Live Preview */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor='client'>LivePreview URL</label>
                    <input
                        type='text'
                        id='livepreview'
                        placeholder='Enter LivePreview URL'
                        value={livepreview}
                        onChange={ev=> setLivePreview(ev.target.value)}
                        required
                    />
                </div>

                {/* Project Category */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor='category'>Select Category (For multi-select, hold Ctrl and click)</label>
                    <select
                        onChange={(ev) => setProjectCategory(Array.from(ev.target.selectedOptions, option => option.value))}
                        name='category'
                        id='category'
                        value={projectcategory}
                        multiple
                        required
                    >
                        {/* <option value="">Select Category</option> */}
                        <option value="website development">Website Development</option>
                        <option value="web app development">Web App Development</option>
                        <option value="app development">App Development</option>
                        <option value="design system">Design System</option>
                        <option value="website migration">Website Migration</option>
                        <option value="E-commerce site">E-Commerce Site</option>
                        <option value="performance evaluation">Performance Evaluation</option>

                        
                    </select>
                </div>

                {/* Blog Images */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <div className='w-100'>
                        <label htmlFor='images'>Images (First image will show as thumbnail, you can drag)</label>
                        <input
                            type='file'
                            id='fileinput'
                            className='mt-1'
                            accept='image/*'
                            multiple
                            onChange={uploadImages}
                        />
                    </div>

                    <div className="w-100 flex flex-left mt-1">
                        {isUploading && (<Spinner />)}
                    </div>
                </div>

                {/* Image Preview and Sortable with Delete */}
                {!isUploading && images.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-2'>
                        <ReactSortable
                            list={Array.isArray(images) ? images : []}
                            setList={updateImagesOrder}
                            animation={200}
                            className='flex flex-wrap gap-2'
                        >
                            {images.map((link, index) => (
                                <div key={link} className='relative uploadedimg'>
                                    <img src={link} alt={`Uploaded ${index + 1}`} className='object-cover w-24 h-24 rounded' />
                                    <button
                                        type='button'
                                        onClick={() => handleDeleteImage(index)}
                                        className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                        title="Delete Image"
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            ))}
                        </ReactSortable>
                    </div>
                )}

                {/* Markdown Description */}
                <div className='description w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor='description'>Project Content (For images: Upload first, copy the link, then use `![alt text](link)`)</label>
                    <MarkdownEditor
                        value={description}
                        onChange={(ev) => setDescription(ev.text)}
                        style={{ width: '100%', height: '400px' }}
                        renderHTML={(text) => (
                            <ReactMarkdown
                                children={text}
                                components={{
                                    code: ({ node, inline, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return inline ? (
                                            <code {...props} className={className}>{children}</code>
                                        ) : (
                                            <div style={{ position: 'relative' }}>
                                                <pre style={{ padding: '0.5em', borderRadius: '5px', overflowX: 'auto', backgroundColor: '#f5f5f5' }} {...props}>
                                                    <code className={className}>{children}</code>
                                                </pre>
                                                <button
                                                    type='button'
                                                    style={{
                                                        position: 'absolute',
                                                        top: '5px',
                                                        right: '5px',
                                                        background: '#fff',
                                                        border: 'none',
                                                        padding: '0.25em 0.5em',
                                                        cursor: 'pointer',
                                                        borderRadius: '3px'
                                                    }}
                                                    onClick={() => navigator.clipboard.writeText(children)}
                                                    title="Copy Code"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        );
                                    }
                                }}
                            />
                        )}
                    />
                </div>

                {/* Tags */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="tags">Tags (For multi-select, hold Ctrl and click)</label>
                    <select
                        onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))}
                        value={tags}
                        name="tags"
                        id="tags"
                        multiple
                        required
                    >
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="bootstrap">BootStrap</option>
                        <option value="TailwindCSS">TailwindCSS</option>
                        <option value="typescript">TypeScript</option>
                        <option value="nextjs">Next.js</option>
                        <option value="reactjs">React.js</option>
                        <option value="mongodb">MongoDB</option>
                        <option value="ejs">Ejs</option>
                        <option value="node.js">Node.js</option>
                        <option value="express.js">Express.js</option>
                        <option value="django">Django</option>
                        <option value="flask">Flask</option>
                        <option value="python">Python</option>
                        <option value="database">Database</option>
                    </select>
                </div>

                {/* Blog Status */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        onChange={ev => setStatus(ev.target.value)}
                        value={status}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="draft">Draft</option>
                        <option value="publish">Publish</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="w-100 mb-1">
                    <button
                        type='submit'
                        className='w-100 addwebbtn flex-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'
                        disabled={isUploading}
                    >
                        {isUploading ? 'Saving...' : 'SAVE DATA'}
                    </button>
                </div>
            </form>
    </>
}

