import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import CountrySelector from '../ui/input/countryInput';
import RadioInput from '../ui/input/radioInput';
import Button from '../ui/button';
import style from './modal.module.css';

const EditModal = ({ isEditOpen, closeEditModal, talentData, onSave }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      country: { label: '', value: '' },
      skillSet: '',
      level: '',
      gender: '',
      portfolio: '',
      image: null,
    },
  });

  useEffect(() => {
    reset({
      ...talentData,
      country: { label: talentData.country, value: talentData.countryCode },
    });
    if (talentData.image) {
      setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${talentData.image}`);
      setValue('image', talentData.image); // Set the initial image value
    }
  }, [talentData, reset, setValue]);
  

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      country: data.country.label, // Extract the label from the selected country object
      countryCode: data.country.value, // Extract the value from the selected country object
    };

    const formData = new FormData();
    Object.keys(formattedData).forEach((key) => {
      if (key !== 'image') {
        formData.append(key, formattedData[key]);
      } else if (formattedData[key] && formattedData[key] !== talentData.image) {
        // Only append the image if it's changed
        formData.append(key, formattedData[key][0]);
      }
    });

    // Get the token from cookies
    const token = Cookies.get('adminData');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/talents/${formattedData._id}`, {
        method: 'PATCH',
        body: formData, // Send formData instead of JSON
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the headers
        },
      });

      if (response.ok) {
        const updatedTalent = await response.json();
        onSave(updatedTalent);
        closeEditModal();
      } else {
        const errorData = await response.json();
        console.error('Error updating talent:', errorData);
      }
    } catch (error) {
      console.error('Network error updating talent:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image', e.target.files); // Set the new image file
    }
  };
  

  return (
    isEditOpen && (
      <div style={{ zIndex: '1000' }}>
        <div className="absolute h-screen w-screen bottom-0 flex items-center justify-center">
          <div className="bg-black min-h-[600px] min-w-[600px] mx-auto p-4">
            <h1 className="text-red-600 flex justify-end cursor-pointer pr-4" onClick={closeEditModal}>
              X
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className={style.carouselForm}>
              <section className="mb-2 w-[100%]">
                <div className={style.inputContainer}>
                  <label htmlFor="name">Name:</label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => <input {...field} />}
                  />
                </div>
                {errors.name && <span className="text-red-600">{errors.name.message}</span>}

                <div className={style.inputContainer}>
                  <label htmlFor="country">Country:</label>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => <CountrySelector {...field} />}
                  />
                </div>
                {errors.country && <span className="text-red-600">{errors.country.message}</span>}

                <div className={style.inputContainer}>
                  <label htmlFor="skillSet">Skill Set:</label>
                  <Controller
                    name="skillSet"
                    control={control}
                    rules={{ required: 'Skill set is required' }}
                    render={({ field }) => <textarea {...field} cols="30" rows="5"></textarea>}
                  />
                </div>
                {errors.skillSet && <span className="text-red-600">{errors.skillSet.message}</span>}

                <div className={`${style.inputContainer} text-black mx-3`}>
                  <label htmlFor="level">Level:</label>
                  <Controller
                    name="level"
                    control={control}
                    rules={{ required: 'Level is required' }}
                    render={({ field }) => (
                      <>
                        <RadioInput {...field} text="Beginner" value="Beginner" checked={field.value === 'Beginner'} />
                        <RadioInput {...field} text="Intermediate" value="Intermediate" checked={field.value === 'Intermediate'} />
                        <RadioInput {...field} text="Professional" value="Professional" checked={field.value === 'Professional'} />
                      </>
                    )}
                  />
                </div>
                {errors.level && <span className="text-red-600">{errors.level.message}</span>}

                <div className={`${style.inputContainer} text-black mx-3`}>
                  <label htmlFor="gender">Gender:</label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <>
                        <RadioInput {...field} text="Female" value="Female" checked={field.value === 'Female'} />
                        <RadioInput {...field} text="Male" value="Male" checked={field.value === 'Male'} />
                      </>
                    )}
                  />
                </div>
                {errors.gender && <span className="text-red-600">{errors.gender.message}</span>}

                <div className={style.inputContainer}>
                  <label htmlFor="portfolio">Portfolio:</label>
                  <Controller
                    name="portfolio"
                    control={control}
                    rules={{ required: 'Portfolio is required' }}
                    render={({ field }) => <input {...field} />}
                  />
                </div>
                {errors.portfolio && <span className="text-red-600">{errors.portfolio.message}</span>}

                <div className={style.inputContainer}>
                  <label htmlFor="image">Image:</label>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="file"
                        onChange={handleImageChange}
                      />
                    )}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Selected" className="h-24 w-24 object-cover" />
                    </div>
                  )}
                </div>
                {errors.image && <span className="text-red-600">{errors.image.message}</span>}
              </section>
              <Button size="md" variant="outline" text="Save" disabled={false} fullWidth={false} type="submit" />
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
