// ===== 1. Ambil elemen =====
const form = document.getElementById('formPetani');
const inputNama = document.getElementById('nama');
const inputId = document.getElementById('idPetani');
const inputAlamat = document.getElementById('alamat');
const inputLahan = document.getElementById('luasLahan');
const tbody = document.querySelector('#tabelPetani tbody');

// ===== 2. Grafik =====
const grafikLahan = new Chart(document.getElementById('grafikLahan'), {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Luas Lahan (ha)',
      data: [],
      backgroundColor: '#7fa86b'
    }]
  }
});
// TODO: const grafikPanen = new Chart(...) untuk data panen (warna cokelat)

// ===== 3. Fungsi bantu =====
function tampilPesan(teks, jenis) {
  const kotak = document.getElementById('pesan');
  kotak.textContent = teks;
  kotak.className = 'pesan ' + jenis;   // 'sukses' atau 'error'

  setTimeout(() => {
    kotak.textContent = '';
    kotak.className = 'pesan';
  }, 3000);
}

function validasi() {
  const nama = inputNama.value.trim();
  const id = inputId.value.trim();

  if (nama === '') {
    tampilPesan('Nama petani tidak boleh kosong!', 'error');
    inputNama.focus();
    return false;
  }
  if (id === '') {
    tampilPesan('ID petani tidak boleh kosong!', 'error');
    inputId.focus();
    return false;
  }
  return true;
}

// ===== 4. Simpan data =====
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!validasi()) return;

  const nama = inputNama.value.trim();
  const lahan = parseFloat(inputLahan.value) || 0;

  // Buat baris dengan textContent (lebih aman daripada innerHTML)
  const data = [
    tbody.rows.length + 1,
    inputId.value.trim(),
    nama,
    inputAlamat.value.trim(),
    lahan
  ];
  const baris = document.createElement('tr');
  data.forEach(function (isi) {
    const sel = document.createElement('td');
    sel.textContent = isi;
    baris.appendChild(sel);
  });
  tbody.appendChild(baris);

  // Perbarui grafik (harus SEBELUM form.reset())
  grafikLahan.data.labels.push(nama);
  grafikLahan.data.datasets[0].data.push(lahan);
  grafikLahan.update();

  form.reset();
  tampilPesan('Data berhasil ditambahkan!', 'sukses');
});

// ===== 5. Pencarian =====
document.getElementById('cari').addEventListener('input', function () {
  const kata = this.value.toLowerCase();
  for (const baris of tbody.rows) {
    const nama = baris.cells[2].textContent.toLowerCase();
    baris.style.display = nama.includes(kata) ? '' : 'none';
  }
});
