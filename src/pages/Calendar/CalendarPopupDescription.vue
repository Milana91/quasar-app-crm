<template>
    <q-dialog>
      <q-card style="min-width: 400px">
        <q-toolbar class="bg-primary text-white row justify-between">
          <q-toolbar-title><span class="text-h5">{{ eventTitle }}</span></q-toolbar-title>
          <AppButton flat dense round color="white"  icon="delete"  @clickAction="$emit('deleteEvent')" />
          <AppButton flat dense round color="white"  icon="mode_edit"  @clickAction="$emit('editEvent')"/>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="column">
            <div> {{ eventDescription }}</div>
            <div class="q-pt-md">
                <div class="row">
                    <div><strong>Дата:</strong></div>
                    <div class="q-pl-md">{{ eventDate }}</div>
                </div>
                <div class="row">
                    <div><strong>Время:</strong></div>
                    <div class="q-pl-md">{{ eventTime }}</div>
                </div>
            </div>  
        </q-card-section>
        <q-card-actions align="right">
          <AppButton flat label="OK" color="primary" @clickAction="$emit('clickAct')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import AppButton from 'components/ui/AppButton'

export default {
    emits: ['clickAct', 'deleteEvent', 'editEvent'],
    props:{
        eventTitle: [String],
        eventDescription: [String],
        eventDate: [String],
        eventTime: [String]
    },
    components: {AppButton}
}
</script>

