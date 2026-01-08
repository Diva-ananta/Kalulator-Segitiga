const inputAlas = document.getElementById('inputAlas');
const inputTinggi = document.getElementById('inputTinggi');
const sisi1 = document.getElementById('sisi1');
const scisi2 = document.getElementById('sisi2');
const sisi3 = document.getElementById('sisi3');
const kaki1 = document.getElementById('kaki1');
const kaki2 = document.getElementById('kaki2');
const kaki3 = document.getElementById('kaki3');
const output = document.getElementById('output');

function hitungLuas(){
    let hasil = 0;
    let a = parseInt(inputAlas.value);
    let t = parseInt(inputTinggi.value);
    hasil =  a * t / 2;
    output.innerHTML = hasil + "cm2";
}

function hitungKeliling(){
    let hasil = 0;
    let a = parseInt(sisi1.value);
    let b = parseInt(sisi2.value);
    let c = parseInt(sisi3.value);
    hasil = a + b + c;
    output.innerHTML = hasil + " cm";
}

function hitungHypotanus(){
    let hasil = 0;
    let a = parseInt(kaki1.value);
    let b = parseInt(kaki2.value);
    hasil = Math.sqrt(a * a + b * b);
    output.innerHTML = hasil + " cm";
}

    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('input[name="mode"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === "trig") {
                    document.getElementById('trig-form').style.display = '';
                    document.getElementById('aturan-form').style.display = 'none';
                    document.getElementById('output').innerHTML = '';
                } else {
                    document.getElementById('trig-form').style.display = 'none';
                    document.getElementById('aturan-form').style.display = '';
                    document.getElementById('output').innerHTML = '';
                }
            });
        });
        document.getElementById('metode').addEventListener('change', function() {
            if (this.value === "sinus") {
                document.getElementById('input-sinus').style.display = '';
                document.getElementById('input-cosinus').style.display = 'none';
            } else {
                document.getElementById('input-sinus').style.display = 'none';
                document.getElementById('input-cosinus').style.display = '';
            }
        });
    });

    function bentukSederhana(fungsi,sudut) {
        const tabel = {
            sin: {0:"0",30:"1/2",45:"√2/2",60:"√3/2",90:"1"},
            cos: {0:"1",30:"√3/2",45:"√2/2",60:"1/2",90:"0"},
            tan: {0:"0",30:"√3/3",45:"1",60:"√3",90:"Tak Hingga"},
            csc: {0:"Tak Hingga",30:"2",45:"2/√2",60:"2/√3",90:"1"},
            sec: {0:"1",30:"2/√3",45:"2/√2",60:"2",90:"Tak Hingga"},
            cot: {0:"Tak Hingga",30:"√3",45:"1",60:"√3/3",90:"0"}
        };
        const sudutBulat = [0,30,45,60,90].find(s => Math.abs(sudut-s)<0.01);
        if (sudutBulat !== undefined && tabel[fungsi] && tabel[fungsi][sudutBulat] !== undefined) {
            return tabel[fungsi][sudutBulat];
        }
        return null;
    }

    function hitungTrigonometri() {
        const satuan = document.getElementById('satuan').value;  
        const fungsi = document.getElementById('fungsi').value; 
        let sudut = parseFloat(document.getElementById('sudut').value);
        if (isNaN(sudut)) {
            output.innerHTML = `<div class="trig-output error">Masukkan sudut yang valid!</div>`;
            return;
        }
        if (satuan === "deg") {
            sudut = sudut;
        } else {
            sudut = sudut * 180 / Math.PI;
        }
        const rad = sudut * Math.PI / 180;
        const sin = Math.sin(rad);
        const cos = Math.cos(rad);
        const tan = Math.tan(rad);

        function safe(val) {
            if (Math.abs(val) > 1e10 || !isFinite(val)) return "Tak Hingga";
            return val.toFixed(4);
        }

        let hasil = "";
        let bentuk = "";
        let label = "";
        if (fungsi === "sin") {
            label = `sin(${satuan==="deg"?sudut+"°":(sudut*Math.PI/180).toFixed(4)+" rad"})`;
            hasil = safe(sin);
            bentuk = bentukSederhana("sin", sudut);
        } else if (fungsi === "cos") {
            label = `cos(${satuan==="deg"?sudut+"°":(sudut*Math.PI/180).toFixed(4)+" rad"})`;
            hasil = safe(cos);
            bentuk = bentukSederhana("cos", sudut);
        } else if (fungsi === "tan") {
            label = `tan(${satuan==="deg"?sudut+"°":(sudut*Math.PI/180).toFixed(4)+" rad"})`;
            hasil = Math.abs(cos) < 1e-10 ? "Tak Hingga" : safe(tan);
            bentuk = bentukSederhana("tan", sudut);
        } else if (fungsi === "csc") {
            label = `csc(${satuan==="deg"?sudut+"°":(sudut*Math.PI/180).toFixed(4)+" rad"})`;
            hasil = Math.abs(sin) < 1e-10 ? "Tak Hingga" : safe(1/sin);
            bentuk = bentukSederhana("csc", sudut);
        } else if (fungsi === "sec") {
            label = `sec(${satuan==="deg"?sudut+"°":(sudut*Math.PI/180).toFixed(4)+" rad"})`;
            hasil = Math.abs(cos) < 1e-10 ? "Tak Hingga" : safe(1/cos);
            bentuk = bentukSederhana("sec", sudut);
        } else if (fungsi === "cot") {
            label = `cot(${satuan==="deg"?sudut+"°":(sudut*Math.PI/180).toFixed(4)+" rad"})`;
            hasil = Math.abs(tan) < 1e-10 ? "Tak Hingga" : safe(1/tan);
            bentuk = bentukSederhana("cot", sudut);
        }
        output.innerHTML = `
            <div class="trig-output">
                <div class="trig-label"><strong>${label}</strong></div>
                <div class="trig-value">= <span class="trig-hasil">${hasil}</span></div>
                ${bentuk ? `<div class="trig-bentuk">Bentuk sederhana: <b>${bentuk}</b></div>` : ""}
            </div>
        `;
    }

    function hitungSudutAturan(metode) {
        const output = document.getElementById('output');
        if (metode === 'sinus') {
            const a = parseFloat(document.getElementById('a').value);
            const A = parseFloat(document.getElementById('A').value);
            const b = parseFloat(document.getElementById('b').value);
            if (isNaN(a) || isNaN(A) || isNaN(b) || A <= 0 || A >= 180 || a <= 0 || b <= 0) {
                output.innerHTML = `<div class="trig-output error">Input tidak valid!</div>`;
                return;
            }
            const radA = A * Math.PI / 180;
            const sinB = b * Math.sin(radA) / a;
            if (sinB < -1 || sinB > 1) {
                output.innerHTML = `<div class="trig-output error">Tidak ada sudut yang memenuhi (cek input).</div>`;
                return;
            }
            const B = Math.asin(sinB) * 180 / Math.PI;
            output.innerHTML = `<div class="trig-output"><div class="trig-label"><strong>Sudut B</strong></div><div class="trig-value">= <span class="trig-hasil">${B.toFixed(4)}&deg;</span></div></div>`;
        } else if (metode === 'cosinus') {
            const a = parseFloat(document.getElementById('a2').value);
            const b = parseFloat(document.getElementById('b2').value);
            const c = parseFloat(document.getElementById('c2').value);
            if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
                output.innerHTML = `<div class="trig-output error">Input tidak valid!</div>`;
                return;
            }
            const cosC = (a*a + b*b - c*c) / (2*a*b);
            if (cosC < -1 || cosC > 1) {
                output.innerHTML = `<div class="trig-output error">Tidak ada sudut yang memenuhi (cek input).</div>`;
                return;
            }
            const C = Math.acos(cosC) * 180 / Math.PI;
            output.innerHTML = `<div class="trig-output"><div class="trig-label"><strong>Sudut C</strong></div><div class="trig-value">= <span class="trig-hasil">${C.toFixed(4)}&deg;</span></div></div>`;
        } else {
            output.innerHTML = `<div class="trig-output error">Pilih metode terlebih dahulu.</div>`;
        }
    }

  const funfacts = [
            "Fun Fact Alam ?",
            "Alam sebenarnya sayang banget lo sama kamu.",
            "Alam menyediakan sumber alam untuk kehidupan kita.",
            "Alam kadang tesakiti karna kamu tauk,tapi nggak ngomong",
            "Alam tau modal ngomong kamu nggak paham.",
            "Alam tahu ego kamu GEDEKKK banget.",
            "Alam udah gak tahan, alam kasih paham kamu lo.",
            "Kalo Alam udah kasih paham kamu, yang tabah yaa kamu.",
            "Kamu jangan benci sama alam.",
            "Alam ingin kamu berubah jadi lebih baik.",
            "Alam jangan kamu sakiti lagi ya.",
            "Alam sabar dan mau bantu kamu berubah.",
            "Kamu belum terlambat kokk, SEMANGATTT.",
            ];
        let idx = 0;
        function tampilkanFunfact() {
            document.getElementById('funfact-ipa').textContent =  funfacts[idx];
            idx = (idx + 1) % funfacts.length;
        }
        tampilkanFunfact();
        setInterval(tampilkanFunfact, 5000);
