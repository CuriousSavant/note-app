'use client'
import React, { SetStateAction, useState } from 'react'
import { Box, Chip, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Add } from '@mui/icons-material';

interface PropsTag {
    tags: string[];
    setTags: React.Dispatch<SetStateAction<string[]>>;
}

const TagsNote: React.FC<PropsTag> = ({ tags, setTags }) => {
    const [newTag, setNewTag] = useState<string>('')

    const handleDeleteTag = (id: number) => {
        setTags(prev => prev.filter((_, index) => index !== id))
    }

    return (
        <Box sx={{ my: "14px" }}>
            <Typography variant='caption' sx={{ fontSize: "12px", fontWeight: 600 }}>
                Tags
            </Typography>
            <Stack direction={'row'}>
                <TextField
                    size='small'
                    variant='outlined'
                    placeholder="create a you tags"
                    onChange={(e) => setNewTag(e.target.value)}
                    value={newTag}
                />
                <IconButton onClick={() => {
                    setTags([newTag, ...tags])
                    setNewTag('')
                }}>
                    <Add />
                </IconButton>
            </Stack>
            <Stack direction={"row"} spacing={1} sx={{ flexWrap: "wrap", mt: "6px" }}>
                {tags.map((item, index) => (
                    <Chip
                        key={index}
                        label={`#${item}`}
                        variant='outlined'
                        onDelete={() => handleDeleteTag(index)}
                    />
                ))}
            </Stack>
        </Box >
    )
}

export default TagsNote;
