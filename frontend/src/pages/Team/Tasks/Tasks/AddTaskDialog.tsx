import { IoCheckmark, IoClose, IoReceiptOutline } from 'react-icons/io5'
import {
    Button,
    Checkbox,
    DialogWindow,
    Form,
    Input,
    TextField,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import React, { SetStateAction, useState } from 'react'
import useInput from '../../../../hooks/useInput'
import TagSelector from './TagSelector'
import { Step, Tag, Task } from '../../../../types'
import { objectsDifference } from '../../../../utils'

interface AddTaskDialogProps {
    icon: React.ReactNode | React.ReactElement
    title: string
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
    initialTask?: Task
    onSuccess(data: Record<string, any>): void
    status?: string
    clearOnClose?: boolean
    successButtonText: string
}

const AddTaskDialog = ({
    icon,
    title: dialogTitle,
    open,
    setOpen,
    initialTask,
    onSuccess,
    status,
    clearOnClose,
    successButtonText,
}: AddTaskDialogProps) => {
    const { t } = useTranslation()
    const title = useInput(initialTask?.title || '', { isEmpty: true })
    const description = useInput(initialTask?.description || '', {
        isEmpty: true,
    })
    const nextStep = useInput('')
    const [steps, setSteps] = useState<Partial<Step>[]>(
        initialTask?.steps || []
    )
    const [requiresReview, setRequiresReview] = useState(
        initialTask?.requires_review || false
    )
    const [selectedTag, setSelectedTag] = useState<Tag | null | undefined>(
        initialTask?.tag
    )

    const addStep = () => {
        if (nextStep.value.trim() === '') return
        setSteps((prev) => [...prev, { title: nextStep.value.trim() }])
        nextStep.clear()
    }

    const removeStep = (step: Partial<Step>) => {
        setSteps((prev) => prev.filter((el) => el !== step))
    }

    const clearForm = () => {
        title.clear()
        description.clear()
        setSelectedTag(undefined)
        setRequiresReview(false)
        setSteps([])
    }

    const formData = {
        title: title.value.trim(),
        description: description.value.trim(),
        requires_review: requiresReview,
        tag: selectedTag,
        status: status || initialTask?.status,
        steps: steps,
    }

    const diff = objectsDifference(initialTask || {}, formData)
    const canSave =
        Object.keys(diff).length > 0 && title.allValid && description.allValid

    return (
        <DialogWindow
            icon={icon}
            title={dialogTitle}
            isOpen={open}
            onSuccess={() => {
                onSuccess(diff)
                clearOnClose && clearForm()
            }}
            successButtonStyle="primary"
            successButtonText={successButtonText}
            close={() => {
                setOpen(false)
                clearOnClose && clearForm()
            }}
            disabled={!canSave}
            closeOnSuccess
            isCover
        >
            <Form>
                <Input must title={t('title')} instance={title} />
                <TagSelector
                    selected={selectedTag}
                    setSelected={setSelectedTag}
                    canEdit
                />
                <TextField
                    must
                    title={t('description')}
                    instance={description}
                />
                <div className="flex items-end gap-3">
                    <Input title={t('subtasks')} instance={nextStep} />
                    <Button
                        action={addStep}
                        className="min-w-10 !p-0"
                        style="primary"
                    >
                        <IoCheckmark />
                    </Button>
                </div>
                {steps.length > 0 && (
                    <ul className="flex flex-wrap gap-3">
                        {steps.map((step, key) => (
                            <li
                                className="bg-gray-200 dark:bg-slate-700 flex items-center rounded-full pl-3 w-fit gap-0.5"
                                key={key}
                            >
                                {step.title}
                                <Button
                                    className="px-2 hover:bg-gray-300 dark:hover:bg-slate-600 min-h-8 rounded-full"
                                    action={() => removeStep(step)}
                                >
                                    <IoClose />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
                <Checkbox
                    value={requiresReview}
                    text={t('requires_review')}
                    setValue={setRequiresReview}
                />
            </Form>
        </DialogWindow>
    )
}

export default AddTaskDialog
