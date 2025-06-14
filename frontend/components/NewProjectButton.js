import { useRouter } from 'next/navigation'; // for redirect
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { initialFormData, emptyDefaultScenes } from '@/lib/defaultFields';

export function NewProjectButton({user}) {
    const router = useRouter();

    const handleCreate = async () => {
        try {
            const newProjectRef = await addDoc(collection(db, "projects"), {
                userID: user.uid,
                updatedAt: new Date().toISOString(),
                formData: initialFormData,
                scenes: emptyDefaultScenes,
                title: "Untitled Project"
            });

            router.push(`/docs/${newProjectRef.id}`);
        } catch (err) {
            console.error("Failed to create new project:", err);
        }
    };

    return (
        <button
            onClick={handleCreate}
            className="mt-4 px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
        >
            + New Project
        </button>
    );
}