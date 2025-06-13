import { FORM_FIELDS, CHARACTER_FIELDS, THEME_FIELDS, VISUAL_FIELDS, SYMBOL_FIELDS, PLOT_FIELDS } from '@/components/StoryForm/fields';
import { ACT_LABELS } from '@/components/SceneGrid/constants'

const allFieldNames = [...new Set([
        ...FORM_FIELDS, 
        ...CHARACTER_FIELDS, 
        ...THEME_FIELDS, 
        ...VISUAL_FIELDS, 
        ...SYMBOL_FIELDS, 
        ...PLOT_FIELDS].map(f => f.name))];

const initialFormData = Object.fromEntries(allFieldNames.map(name => [name, '']));

const emptyDefaultScenes = ACT_LABELS.map(label => ({
        act: label,
        scenes: [{id: crypto.randomUUID(), type: 'Scene', text: '', visuals: '', symbols: ''}]
}))

export { initialFormData, emptyDefaultScenes }