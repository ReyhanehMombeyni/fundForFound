'use client'

import { usePostForm } from '../../context/context'
import SocialLinkSelector from './components/SocialLinkSelector';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EditorBlock from './components/EditorBlock';

const Detailed = () => {
    const router= useRouter();
    const { state } = usePostForm();

    useEffect(() => {
        const {name, country, category, subCategory, selectedTags}= state.firstStep;
        if(!name || !country || !category || !subCategory || !selectedTags?.length) {
            router.push("/home/basic-info");
        }
    }, [state]);

  return (
    <div className="flex flex-col items-center">
        <div className="py-15 max-w-200 px-5 text-left">
            <h1 className="text-3xl font-semibold text-primary">Detailed info</h1>
            <p className="font-bold text-xl py-2">
                What is the primary mission or objective of your brand/organization?
            </p>
            <span className="text-gray-500 text-sm leading-4">
                Be more specific about it, as it will published as your deck on the 3F(150-300 characters.) <span className='text-blue-500'>read more</span>
            </span>
            <EditorBlock />
            <p className="font-bold text-xl pt-10">
                Help your contributors find you faster (at least 3 option)
            </p>
            <span className="text-gray-500 text-sm leading-4">
                Connect your socials so the contributors get to know you better and find you faster.
            </span>
            <SocialLinkSelector />
        </div>
    </div>
  )
}

export default Detailed