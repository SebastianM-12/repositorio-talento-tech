//configuracion supabase
const SUPABASE_URL = 'https://ghyzejocxbaopxgjyoov.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoeXplam9jeGJhb3B4Z2p5b292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTAyMzUsImV4cCI6MjA2OTQ2NjIzNX0.cARJHLGd3YfG62u-G2xuSyjoG31LQE7oyrb8sfGjkaw';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async function () {
    //Autentificacion Anonima 
    await supabase.auth.signInAnonymously();

    //Ejecutar todas las funciones
    fetchTop20paises();
    fetchTopRegiones();
    fetchColombiavsSurAmerica();

    //grafico de barras de los 20 paises con mayor produccion de energia renovable
    async function fetchTop20paises() {
        const { data, error } = await supabase
            .from('top_20_paises')
            .select('*')
            .order('promedio_renovables', { ascending: false })
            .limit(20);

        if (error) throw error;

        createBarChart('graficoBarraPaises', data, 'pais', 'promedio_renovables', 'Porcentaje de Energia Renovable', 'rgba(54,162,235,0.6)');
    }

    //Grafico de Barras de Prodcuccion de Energia por Regiones 
    async function fetchTopRegiones() {
        const { data, error } = await supabase
            .from('top_regiones')
            .select('*')
            .order('promedio_renovables', { ascending: false });

        if (error) throw error;

        createBarChart('graficoBarraRegiones', data, 'region', 'promedio_renovables', 'Porcentaje de Energia Renovable por Region', 'rgba(90,126,114,0.6)');
    }

    //funcion para crear graficas de barras
    function createBarChart(canvasId, data, labelField, dataField, label, backgroundColor) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item[labelField]),
                datasets: [{
                    label: label,
                    data: data.map(item => item[dataField]),
                    backgroundColor: backgroundColor,
                    borderColor: backgroundColor.replace('0.6', '1'),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Porcentaje (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: canvasId.includes('Paises') ? 'Paises' : 'Regiones'
                        }
                    }
                }
            }
        });
    }

    //Grafico de lineas Comparativa entre colombia y suramerica 
    async function fetchColombiavsSurAmerica() {
        const { data, error } = await supabase
            .from('colombia_suramerica')
            .select('*')
            .lte('anno', 2021)
            .order('anno', { ascending: true })

        if (error) throw error;

        //Procesar los datos 
        const colombiaData = data.filter(item => item.region === 'Colombia');
        const suramericaData = data.filter(item => item.region === 'South America');
        const years = [...new Set(data.map(item => item.anno))];


        const ctx =document.getElementById('graficoLineasComparativa').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Colombia',
                        data: colombiaData.map(item => item.renovables),
                        borderColor: 'rgba(255, 99,132,1)',
                        backgroundColor: 'rgba(255,99,63,0.2)',
                        fill: false,
                        borderWidth: 1,
                        tension: 0.1
                    },
                    {
                        label: 'South America',
                        data: suramericaData.map(item => item.renovables),
                        borderColor: 'rgba(54, 162,235,1)',
                        backgroundColor: 'rgba(54,162,235, 0.2)',
                        fill: false,
                        borderWidth: 1,
                        tension: 0.2
                    }
                ]
            },
            options:{
                responsive: true,
                scales:{
                    y:{
                        beginAtZero: true,
                        title: {
                            display:true,
                            text: 'Produccion de Energia Renovable (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text:'año'
                        }
                    }
                }
            }          
        });
    }
});