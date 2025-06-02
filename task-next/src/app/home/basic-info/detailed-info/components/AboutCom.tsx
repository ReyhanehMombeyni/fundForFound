'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function BrandForm() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      shortSummary: '',
      impact: '',
      story: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-xl border-purple-400 p-6 mt-10 shadow-sm w-full max-w-2xl bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
      </form>
    </div>
  );
}


