<template>
  <div
    id="surveyCreatorContainer"
    class="zoom"
  />
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import * as SurveyCreator from 'survey-creator'
import 'survey-creator/survey-creator.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as SurveyKo from 'survey-knockout'
import * as widgets from 'surveyjs-widgets'
import { init as customWidget } from './customwidget'
// widgets.icheck(SurveyKo);
widgets.select2(SurveyKo)
widgets.inputmask(SurveyKo)
widgets.jquerybarrating(SurveyKo)
widgets.jqueryuidatepicker(SurveyKo)
widgets.nouislider(SurveyKo)
widgets.select2tagbox(SurveyKo)
widgets.sortablejs(SurveyKo)
widgets.ckeditor(SurveyKo)
widgets.autocomplete(SurveyKo)
widgets.bootstrapslider(SurveyKo)
customWidget(SurveyKo)
SurveyKo.Serializer.addProperty('question', 'tag:number')
// Add additional things for object
SurveyKo.Serializer.addProperty('question', 'score:number')

SurveyKo
  .Serializer
  .addProperty('question', {
    name: 'uuid',
    category: 'general',
  })
SurveyKo
  .Serializer
  .addProperty('survey', {
    name: 'uuid',
    category: 'general',
  })
SurveyKo
  .Serializer
  .addProperty('page', {
    name: 'uuid',
    category: 'general',
  })
// Make name and tag properties read-only
SurveyKo
  .Serializer
  .findProperty('question', 'name')
  // .readOnly = true
SurveyKo
  .Serializer
  .findProperty('question', 'uuid')
  .readOnly = true

// Make name and tag properties read-only
SurveyKo
  .Serializer
  .findProperty('survey', 'name')
  // .readOnly = true
SurveyKo
  .Serializer
  .findProperty('survey', 'uuid')
  .readOnly = true

// Make name and tag properties read-only
SurveyKo
  .Serializer
  .findProperty('page', 'name')
  // .readOnly = true
SurveyKo
  .Serializer
  .findProperty('page', 'uuid')
  .readOnly = true

// eslint-disable-next-line camelcase
const CkEditor_ModalEditor = {
  afterRender(modalEditor, htmlElement) {
    const editor = window.CKEDITOR.replace(htmlElement)
    editor.on('change', () => {
      // eslint-disable-next-line no-param-reassign
      modalEditor.editingValue = editor.getData()
    })
    editor.setData(modalEditor.editingValue)
  },
  destroy(modalEditor, htmlElement) {
    const instance = window.CKEDITOR.instances[htmlElement.id]
    if (instance) {
      instance.removeAllListeners()
      window.CKEDITOR.remove(instance)
    }
  },
}
SurveyCreator.StylesManager.applyTheme('bootstrap')
SurveyCreator.SurveyPropertyModalEditor.registerCustomWidget('html', CkEditor_ModalEditor)
export default {
  name: 'SurveyCreator',
  mounted() {
    const options = { showEmbededSurveyTab: false, haveCommercialLicense: true, showLogicTab: true }
    this.surveyCreator = new SurveyCreator.SurveyCreator('surveyCreatorContainer', options)
    this.surveyCreator.showToolbox = 'left'
    this.surveyCreator.showPropertyGrid = 'left'
    this.surveyCreator.rightContainerActiveItem('toolbox')
    this.surveyCreator.JSON = {
      pages: [
        {
          name: 'page1',
          uuid: uuidv4(),
        },
      ],
    }

    // Properties Panel initial
    this.surveyCreator.survey.uuid = uuidv4()

    this.surveyCreator.onQuestionAdded
    // eslint-disable-next-line no-shadow
      .add((sender, options) => {
        const q = options.question
        const t = q.getType()
        q.name = `Question${t[0].toUpperCase()}${t.substring(1)}`
        q.uuid = uuidv4()
      })

    // Page

    this.surveyCreator.onPageAdded
    // eslint-disable-next-line no-shadow
      .add((sender, options) => {
        const p = options.page
        p.uuid = uuidv4()
      })

    // Question order
    SurveyCreator
      .SurveyQuestionEditorDefinition
      .definition.question
      .properties = [
        {
          name: 'uuid',
          title: 'UUID',
        },
        'name',
        'title',
        {
          name: 'tag',
          title: 'Tag',
        },
        {
          name: 'score',
          title: 'Score',
        },
      ]

    this.surveyCreator.saveSurveyFunc = function () {
      console.log(JSON.stringify(this.text))

      localStorage.setItem('Survey', this.text)
    }
  },
}
</script>

<style scoped>

</style>
