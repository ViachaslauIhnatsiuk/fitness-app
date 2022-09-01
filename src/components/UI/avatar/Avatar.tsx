import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import {
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
  setDoc,
  doc,
  db
} from '../../../firebase/firebase';
import { AvatarProps } from './models';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import { useAppDispatch } from '../../../store/store';
import { setUserState } from '../../../store/slices/profileSlice';
import avatar from '../../../assets/avatar.svg';
import s from './Avatar.module.css';

const Avatar: FC<AvatarProps> = ({ setImageUrl }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectProfile);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [image]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const [file] = Object.values(e.target.files as FileList);
    if (file) setImage(file);
    const imageRef = ref(storage, `avatars/${uuidv4()}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    setImageUrl(url);
    dispatch(setUserState({ ...currentUser, avatar: url }));
    setDoc(doc(db, 'users', currentUser.id), {
      ...currentUser,
      avatar: url
    }).catch((error: Error) => error);
  };

  return (
    <div className={s.avatar}>
      <div className={s.image_wrapper}>
        <img className={s.image} src={preview || currentUser.avatar || avatar} alt="avatar" />
      </div>
      <label htmlFor="edit" className={s.edit_label}>
        <MdModeEditOutline className={s.edit_icon} />
        <input id="edit" type="file" className={s.edit} onChange={handleImageChange} />
      </label>
    </div>
  );
};

export { Avatar };
