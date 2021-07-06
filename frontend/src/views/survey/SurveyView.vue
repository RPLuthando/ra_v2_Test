<template>
  <div class="container">
    <survey :survey="survey" />
  </div>
</template>

<script>
import * as SurveyVue from 'survey-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import * as widgets from 'surveyjs-widgets'
import { init as customWidget } from '@/components/survey/customwidget'
import { v4 as uuidv4 } from 'uuid'

const { Survey } = SurveyVue
Survey.cssType = 'bootstrap'
// widgets.icheck(SurveyVue);
widgets.select2(SurveyVue)
widgets.inputmask(SurveyVue)
widgets.jquerybarrating(SurveyVue)
widgets.jqueryuidatepicker(SurveyVue)
widgets.nouislider(SurveyVue)
widgets.select2tagbox(SurveyVue)
widgets.sortablejs(SurveyVue)
widgets.ckeditor(SurveyVue)
widgets.autocomplete(SurveyVue)
widgets.bootstrapslider(SurveyVue)
customWidget(SurveyVue)
SurveyVue.Serializer.addProperty('question', 'tag:number')

export default {
  name: 'SurveyView',
  components: {
    Survey,
  },
  metaInfo: {
    title: 'Rapid Assurance',
    titleTemplate: '%s | Survey',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
  data() {
    const json = localStorage.getItem('Survey')

    const model = new SurveyVue.Model(json)
    return {
      survey: model,
    }
  },
  mounted() {
    this.survey.onComplete.add(sender => {
      // Jacques to add UUIDv4 on post
      console.log(sender.data)
    })
  },
}
</script>

<style scoped>

</style>
