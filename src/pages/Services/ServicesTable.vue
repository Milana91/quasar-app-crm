<template>
  <div class="q-pa-md">
   <q-table
      v-model:pagination="pagination"
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[5, 13]"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit v-model.number="props.row.calories" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
            <q-popup-edit disable v-model.number="props.row.fat" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit disable v-model.number="props.row.carbs" buttons persistent v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">
            {{ props.row.protein }}
            <q-popup-edit disable v-model.number="props.row.protein" buttons label-set="Save" label-cancel="Close" v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="sodium" :props="props">
            {{ props.row.sodium }}
            <q-popup-edit  disable v-model.number="props.row.sodium" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { tableColumns } from 'src/data/tableColumns'
import { tableRows } from 'src/data/tableRows'
import {ref} from 'vue'

export default {
   setup(){
     const columns = ref(tableColumns)
     const rows = ref(tableRows)

     const pagination = ref({
      sortBy: 'desc',
    })

    return {
      rows,
      columns,
      pagination
    }
  },
  components: {   }
}
</script>
