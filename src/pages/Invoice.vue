<template>
  <div v-if="!loader"   style="padding-top: 30px;">
    <div class="main" ref="htmlToPdf">
      <table width="100%" style="font-family: Arial; margin-bottom: 9px">
        <tr>
          <td style="width: 32%; text-align: center; padding: 30px 0">
            <img :src="require(`src/assets/contextvn.gif`)" style="width: 70%" />
          </td>
          <td style="width: 68%; padding: 20px 0">
            <div style="text-align: justify; font-size: 9pt">
              Внимание! Оплата данного счета означает согласие с условиями оказания услуг
            </div>
          </td>
        </tr>
      </table>

      <table
        class="requisites"
        width="100%"
        style="
          border: 2px solid;
          border-collapse: collapse;
          width: 100%;
          font-family: Arial;
        "
        cellpadding="2"
        cellspacing="2"
      >
        <tr style="">
          <td
            colspan="2"
            rowspan="2"
            style="border: 1px solid; min-height: 76px; width: 105mm"
          >
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="height: 76px"
            >
              <tr>
                <td valign="top">
                  <div>ПАО "СБЕРБАНК" г. Великий Новгород<br />Г.</div>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px; height: 14px">
                  <div style="font-size: 10pt">Банк получателя</div>
                </td>
              </tr>
            </table>
          </td>
          <td
            style="
              border: 1px solid;
              min-height: 7mm;
              height: auto;
              width: 25mm;
            "
          >
            <div>БИK</div>
          </td>
          <td
            rowspan="2"
            style="border: 1px solid; vertical-align: top; width: 60mm"
          >
            <div style="height: 7mm; line-height: 7mm; vertical-align: middle">
              044030555
            </div>
            <div>30101810000000000555</div>
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid; width: 25mm">
            <div>Сч. №</div>
          </td>
        </tr>
        <tr>
          <td
            style="
              padding-bottom: 11px;
              border: 1px solid;
              min-height: 6mm;
              height: auto;
              width: 50mm;
            "
          >
            <div>ИНН 5321204686</div>
          </td>
          <td
            style="
              padding-bottom: 11px;
              border: 1px solid;
              min-height: 6mm;
              height: auto;
              width: 55mm;
            "
          >
            <div>КПП 532101001</div>
          </td>
          <td
            rowspan="2"
            style="
              border: 1px solid;
              min-height: 19mm;
              height: auto;
              vertical-align: top;
              width: 25mm;
            "
          >
            <div>Сч. №</div>
          </td>
          <td
            rowspan="2"
            style="
              border: 1px solid;
              min-height: 19mm;
              height: auto;
              vertical-align: top;
              width: 60mm;
            "
          >
            <div>40702810306000008712</div>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="min-height: 13mm; height: auto">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="height: 13mm; width: 105mm"
            >
              <tr>
                <td valign="top">
                  <div>ООО "КОНТЕКСТ ВН"</div>
                </td>
              </tr>
              <tr>
                <td valign="bottom" style="padding-bottom: 11px; height: 3mm">
                  <div style="font-size: 10pt">Получатель</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <br />

      <div
        style="
          font-weight: bold;
          font-size: 14pt;
          padding-left: 5px;
          font-family: Arial;
        "
      >
        Счет №{{ invoiceNumber }} от {{ todayDate }}
      </div>
      <br />

      <div
        style="
          background-color: #000000;
          width: 100%;
          font-size: 1px;
          height: 2px;
        "
      >
        &nbsp;
      </div>

      <table width="100%" style="font-family: Arial; margin-bottom: 18px">
        <tr>
          <td style="width: 30mm; vertical-align: top">
            <div style="padding-left: 2px">Поставщик:</div>
          </td>
          <td>
            <div style="font-weight: bold; padding-left: 2px">
              ООО "КОНТЕКСТ ВН" ИНН 5321204686, КПП 532101001,<br />
              <span style="font-weight: normal"
                >173003, Российская Федерация, г. Великий Новгород, наб. Р. Гзень, д. 5<br />
                пом. 616, тел.: +7 (816-2) 502-605
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td style="width: 30mm; vertical-align: top">
            <div style="padding-left: 2px">Покупатель:</div>
          </td>
          <td>
            <div style="font-weight: bold; padding-left: 2px">
              {{customerCompany}}<br /><br />
            </div>
          </td>
        </tr>
      </table>

      <table
        class="products"
        width="100%"
        cellpadding="2"
        cellspacing="2"
        style="
          border: 2px solid;
          border-collapse: collapse;
          width: 100%;
          font-family: Arial;
        "
      >
        <thead>
          <tr>
            <th style="width: 13mm">№</th>

            <th>Товары (работы, услуги)</th>
            <th style="padding-bottom: 11px; width: 20mm">Кол-во</th>
            <th style="width: 17mm">Ед.</th>
            <th style="width: 27mm">Цена</th>
            <th style="width: 27mm">Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, index) in projectServicesWithPrices" :key="service">
            <td style="width: 11mm; text-align: center; padding-bottom: 11px">{{index + 1}}</td>

            <td style="padding-bottom: 11px">{{ service.title }}</td>
            <td style="text-align: center; width: 20mm; padding-bottom: 11px">1</td>
            <td style="width: 17mm; text-align: center; padding-bottom: 11px">Шт.</td>
            <td style="width: 27mm; text-align: center; padding-bottom: 11px">
              {{ service.price + ',00' }}
            </td>
            <td style="width: 27mm; text-align: center; padding-bottom: 11px">
              {{ service.price + ',00' }}
            </td>
          </tr>
        </tbody>
      </table>

      <table
        style="font-family: Arial"
        border="0"
        width="100%"
        cellpadding="1"
        cellspacing="1"
      >
        <tr>
          <td></td>
          <td style="width: 27mm; font-weight: bold; text-align: right">
            Итого:
          </td>
          <td style="width: 27mm; font-weight: bold; text-align: center">
            {{ projectSum + ',00'}}
          </td>
        </tr>
        <tr>
          <td></td>
          <td style="width: 27mm; font-weight: bold; text-align: right">Без НДС</td>
          <td></td>
        </tr>
      </table>

      <br />
      <div style="font-family: Arial">
        Всего наименований {{countServices}} на сумму {{ projectSum + ',00'}} рублей.<br />
        <!-- Ноль рублей 00 копеек -->
      </div>
      <br />
      <div
        style="
          background-color: #000000;
          width: 100%;
          font-size: 1px;
          height: 2px;
        "
      >
        &nbsp;
      </div>
      <div
        style="
          background: url('<!--url печати в png сюда-->');
          background-repeat: no-repeat;
          padding: 30px 10px;
          width: 100%;
          height: 25px;
        "
      >

      <div style="width: 100%; display: flex; flex-direction: row; justify-content: space-between"> 
            <div style="font-size: 11pt">Руководитель _________________ Ляховский Д. А.<div class=""></div></div>

            <div style="font-size: 11pt">
              Главный бухгалтер ______________________
            </div>

          <!-- <div style="width: 50px; text-align: center">М.П.</div>
          <br /> -->
        </div>
      </div>
      <br />
      <!-- <div style="width: 50px; text-align: center">М.П.</div> -->
      <br />
      <!-- <br />
      <br /><br /><br />
      <br /><br /><br />
      <br /><br /> -->
    </div>
  </div>
  <div class="q-pa-md flex flex-center" v-else>
    <AppLoaderCircular size="120px"/>
    <!-- <q-circular-progress
      indeterminate
      size="120px"
      color="primary"
      class="q-ma-md"
    /> -->
  </div>
  <AppButton class="absolute-right pdf-btn" label="Скачать PDF" id="download" @click="createPdf"></AppButton>
</template>

<script>
import { jsPDF } from "jspdf";
import { ref, reactive, computed, onMounted, onUnmounted, watch} from "vue"
import VueHtml2Canvas from "vue-html2canvas"
import html2canvas from "html2canvas"
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import AppLoaderCircular from 'components/ui/AppLoaderCircular'
import AppButton from 'components/ui/AppButton'

export default {
  components: {AppLoaderCircular, AppButton},
  setup() {
    const htmlToPdf = ref(null)
    const store = useStore()
    const router = useRouter()

    const getStoreServices = computed(() => store.state.services.services)
    const customerCompany =  computed(() => store.state.invoice.company)
    let projectServices =  computed(() => store.state.invoice.projectServices)
    const projectServicesWithPrices = ref([])
    const projectSum = ref(0)
    const countServices = ref(0)
    const todayDate = new Date().toLocaleDateString("ru", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        })
    const invoiceNumber = computed(()=>store.state.invoice.invoiceNumber)
    const getProjectSum = ()=>{
      const sum = ref(0)
      const counter = ref(0)
      projectServicesWithPrices.value.forEach((obj)=>{
        sum.value = sum.value + obj.price
        counter.value++
      })
      projectSum.value = sum.value
      countServices.value = counter.value
    }

    // собрать массив с объектами с услугами: название-цена
    const getServicesPricesObj = () => {
      console.log('sdgdhdfh', getStoreServices.value)
      console.log('nsgnsl', projectServices.value)
      getStoreServices.value.forEach((item)=>{
        projectServices.value.forEach((val)=>{
          if(item.serviceTitle == val){
            projectServicesWithPrices.value.push({title: item.serviceTitle, price: item.serviceCost })
          }
        })
      })
      // await store.dispatch('services/loadServices')
      console.log('услуги с ценами выбранные', projectServicesWithPrices.value)
    }

    const loader = ref(true)


    onMounted(() => {
      setTimeout(() => {
        getServicesPricesObj()
        getProjectSum()
        console.log('svsxdg', projectServices.value.length)
      }, 1000);

      // console.log('sdgdhdfh', getStoreServices.value)
      // console.log('nsgnsl', projectServices.value)
      // getStoreServices.value.forEach((item)=>{
      //   projectServices.value.forEach((val)=>{
      //     if(item.serviceTitle == val){
      //       projectServicesWithPrices.value.push({title: item.serviceTitle, price: item.serviceCost })
      //     }
      //   })
      // })
      // // await store.dispatch('services/loadServices')
      // console.log('услуги с ценами выбранные', projectServicesWithPrices.value)
      // console.log('svsxdg', projectServices.value.length)
      setTimeout(() => {
        loader.value = false
        if(projectServices.value.length == 0){
           router.push('/projects')
        }
      },2500);
    })

    watch(projectServices.value, (val)=>{
      console.log('qwerty', projectServices.value.length)
    })

    // onUnmounted(()=>{
    //   projectServices.value = null
    // })

    const createPdf = () => {
      console.log(htmlToPdf.value);
      // , {
      //     scale:0.7
      //   }
      html2canvas(htmlToPdf.value, {
          scale:1,
          dpi: 300,
        }).then((canvas) => {
        // let imgWidth = 0;
        // let imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL("image/png");
        let pdf = new jsPDF("p", "mm", "a4");
        // let position = 0;
    //    const pageWidth = pdf.internal.pageSize.getWidth();
    // const pageHeight = pdf.internal.pageSize.getHeight();

    // const widthRatio = pageWidth / canvas.width;
    // const heightRatio = pageHeight / canvas.height;
    // const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    // const canvasWidth = canvas.width * ratio;
    // const canvasHeight = canvas.height * ratio;

    // const marginX = (pageWidth - canvasWidth) / 2;
    // const marginY = (pageHeight - canvasHeight) / 2;
    //     pdf.addImage(contentDataURL, "PNG",  marginX, marginY, canvasWidth, canvasHeight);
        pdf.addImage(contentDataURL, "PNG", 20, 0);
        pdf.save("newPDF.pdf");
      });
    };

    return {
      createPdf,
      htmlToPdf,
      customerCompany,
      projectServices,
      projectServicesWithPrices,
      projectSum,
      countServices,
      loader,
      todayDate,
      invoiceNumber
    };
  },
};
</script>

<style lang="sass">
.main
  width: 666px
  margin: 0 auto
  font-size: 14px


.products
    th, td
        border: 1px solid

.pdf-btn
  height: 50px
  top: 7%
  right: 17%

</style>
