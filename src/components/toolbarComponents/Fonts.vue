<script>

export default {
  data() {
    return {
        font: 'Select',
        bgDarken: '',
        secondaryDarken: '',
        hintDarken: '',
        buttonTextDarken: '',
        buttonDarken: ''
    }
  },

  methods: {
    pSBC(p,c0,c1,l){
        let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
        if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
        if(!this.pSBCr)this.pSBCr=(d)=>{
            let n=d.length,x={};
            if(n>9){
                [r,g,b,a]=d=d.split(","),n=d.length;
                if(n<3||n>4)return null;
                x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
            }else{
                if(n==8||n==6||n<4)return null;
                if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
                d=i(d.slice(1),16);
                if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
                else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
            }return x};
        h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
        if(!f||!t)return null;
        if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
        else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
        a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
        if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
        else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
    }
  },

  computed:{
    cssVars() {
        return {
            '--computed-bg-darken': this.bgDarken,
            '--computed-secondary-darken': this.secondaryDarken,
            '--computed-hint-darken': this.hintDarken,
            '--computed-button-text-darken': this.buttonTextDarken,
            '--computed-button-darken': this.buttonDarken
        }
    }
  },

  mounted() {
    let color1 = getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-bg-color')
    let color2 = getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-secondary-bg-color')
    let color3 = getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-hint-color')
    let color4 = getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-button-text-color')
    let color5 = getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-button-color')

    this.bgDarken = this.pSBC(-0.2, color1)
    this.secondaryDarken = this.pSBC(-0.2, color2)
    this.hintDarken = this.pSBC(-0.2, color3)
    this.buttonTextDarken = this.pSBC(-0.2, color4)
    this.buttonDarken = this.pSBC(-0.2, color5)
    
    // console.log(getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-bg-color'))
  }

}
</script>

<template>
    <div class="font-holder" :style="cssVars">
        <h2>Font</h2>
        <div class="font-row">
            <div class="font-row-bg">
                <button class="btn btn-outline-secondary dropdown-toggle font-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ font }}</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="font = 'Font Option 1'">Font Option 1</a></li>
                    <li><a class="dropdown-item" @click="font = 'Font Option 2'">Font Option 2</a></li>
                    <li><a class="dropdown-item" @click="font = 'Font Option 3'">Font Option 3</a></li>
                </ul>
                <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="">
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="radio" class="btn-check" name="text-align-options" id="align-left">
                <label class="btn btn-secondary text-btn" for="align-left">
                    <font-awesome-icon icon="fa-solid fa-align-left" />
                </label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-center">
                <label class="btn btn-secondary text-btn" for="align-center">
                    <font-awesome-icon icon="fa-solid fa-align-center" />
                </label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-right">
                <label class="btn btn-secondary text-btn" for="align-right">
                    <font-awesome-icon icon="fa-solid fa-align-right" />
                </label>
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="radio" class="btn-check" name="text-style-options" id="text-bold">
                <label class="btn btn-secondary text-btn" for="text-bold">
                    <font-awesome-icon icon="fa-solid fa-bold" />
                </label>

                <input type="radio" class="btn-check" name="text-style-options" id="text-italic">
                <label class="btn btn-secondary text-btn" for="text-italic">
                    <font-awesome-icon icon="fa-solid fa-italic" />
                </label>

                <input type="radio" class="btn-check" name="text-style-options" id="text-hold">
                <label class="btn btn-secondary text-btn" for="text-hold">
                    <font-awesome-icon icon="fa-solid fa-face-frown-open" />
                </label>

                <input type="radio" class="btn-check" name="text-style-options" id="text-underline">
                <label class="btn btn-secondary text-btn" for="text-underline">
                    <font-awesome-icon icon="fa-solid fa-underline" />
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-holder {
    padding: 5%;
}
.font-row {
    display: flex;
    justify-content: center;
}
.font-row-bg {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: space-between;
    /* background: rgba(72, 66, 66, 0.2); */
    background-color: var(--computed-hint-darken);
    margin-block: 8px;
    border-radius: 0.375rem;
    padding: 2%;
}
.font-btn {
    width: 50%;
    margin-right: 10px;
    color: var(--tg-theme-button-text-color);
    background-color: var(--tg-theme-button-color);
    z-index: 2;
}
.btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
    color: var(--computed-button-text-darken);
    background-color: var(--computed-button-darken);
}

.form-control {
    /* background: rgba(72, 66, 66, 0.1) !important; */
    background-color: var(--computed-bg-darken) !important;
    color: var(--tg-theme-text-color);
}
.form-control:focus {
    box-shadow: 0 0 0 0.25rem var(--computed-hint-darken);
}
.text-btn {
    margin-inline: 2px;
    font-size: 1.7vmax;
    background-color: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
}
</style>