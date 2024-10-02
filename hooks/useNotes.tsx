'use client'
import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react'
import { PropsNote } from '@/lib/propsState';

const useNotes = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState<{ isOpen: boolean, type: string, data: null | string }>({
        isOpen: false,
        type: "add",
        data: null
    })
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const [createAt, setCreateAt] = useState<Date | string>(() => {
        const date = new Date();
        return `${date.toLocaleDateString('en-US')} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    })
    const [allNotes, setAllNotes] = useState<PropsNote[]>([])
    const [editId, setEditId] = useState<number | null>(null)
    const [searchItem, setSearchItem] = useState<string>('');
    const [isPin, setIsPin] = useState<boolean>(false);

    const fetchNotes = async () => {
        await axios.get(`/api/notes?search=${searchItem}`)
            .then(response => setAllNotes(response.data))
    }

    const noteData = {
        title: title,
        content: content,
        tags: tags,
        createAt: createAt,
        pin: isPin,
    }
    const handleStartEdit = (notes: PropsNote) => {
        setTitle(notes.title)
        setContent(notes.content)
        setTags(notes.tags)
        setIsOpenEditModal({ isOpen: true, type: "edit", data: null })
        setEditId(notes.id)
    }

    const handleNoteSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatDate = `${new Date().toLocaleDateString('en-US')} - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        if (editId !== null) {
            axios.put(`/api/notes/${editId}`, noteData).then(() => {
                setIsOpenEditModal({ isOpen: false, type: "edit", data: null });
                fetchNotes();
                resetState();
                setCreateAt(formatDate)
            })
        } else {
            axios.post('/api/notes', noteData)
                .then((response) => {
                    setAllNotes([response.data, ...allNotes]);
                    setIsOpenEditModal({ isOpen: false, type: "add", data: null });
                    fetchNotes();
                    resetState();
                    setCreateAt(formatDate)
                })
        }
    }

    const deleteNote = (id: number) => {
        axios.delete(`/api/notes/${id}`)
            .then(() => {
                fetchNotes()
                resetState();
            })
    }

    useEffect(() => {
        fetchNotes()
    }, [searchItem])

    const resetState = () => {
        setTitle('');
        setContent('');
        setTags([]);
        setEditId(null);
    }

    const notePin: PropsNote[] = allNotes.filter((note) => {
        if (isPin) return note.pin;
        // if (isPin === false) return !note.pin;
        return true;
    })

    const pinMark = async (id: number, currentPinStatus: boolean) => {
        try {
            await axios.put(`/api/notes/${id}`, { pin: !currentPinStatus });
            setAllNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? { ...note, pin: !currentPinStatus } : note
                )
            );
        } catch (error) {
            console.error("Error while pinning the note:", error);
        }
    };

    return {
        isOpenEditModal,
        setIsOpenEditModal,
        title,
        setTitle,
        content,
        setContent,
        tags,
        setTags,
        createAt,
        setCreateAt,
        setEditId,
        allNotes,
        setAllNotes,
        resetState,
        handleNoteSubmit,
        deleteNote,
        handleStartEdit,
        editId,
        searchItem,
        setSearchItem,
        notePin,
        isPin,
        setIsPin,
        pinMark,
    }
}

export default useNotes;