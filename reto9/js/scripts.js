document.addEventListener('DOMContentLoaded', function () {
    fetch('data/top_20_paises.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarraPaises').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.pais),
                    datasets: [{
                        label: 'Porcentaje de Energía Renovable',
                        data: data.map(item => item['promedio_renovables']),
                        backgroundColor: 'rgba(54,162,235,0.6)',
                        borderColor: 'rgba(54,162,235,1)',
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
                                text: 'Paises'
                            }
                        }
                    }
                }
            });
        });

    //Grafico de Barras de produccion de Energias Renovables por Regiones
    fetch('data/top_regiones.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarraRegiones').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.region),
                    datasets: [{
                        label: 'Porcentaje de Energía Renovable',
                        data: data.map(item => item['promedio_renovables']),
                        backgroundColor: 'rgba(177,93,157,0.6)',
                        borderColor: 'rgba(171,30,145,1)',
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
                                text: 'Regiones'
                            }
                        }
                    }
                }
            });
        });
    //grafico de lineas de comparativa de produccion  de energia renovable - Colombia vs sur America
    fetch('data/colombia_suramerica.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.anno <= 2021);
            const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [...new Set(filteredData.map(item => item.anno))],
                    datasets: [
                        {
                            label: 'Colombia',
                            data: filteredData.filter(item => item.region === 'Colombia').map(item => item.renovables),
                            borderColor: 'rgba(255, 99,132,1)',
                            backgroundColor: 'rgba(255, 9,63,0.2)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.2
                        },

                        {
                            label: 'South America',
                            data: filteredData.filter(item => item.region === 'South America').map(item => item.renovables),
                            borderColor: 'rgba(10, 120,0,0.63)',
                            backgroundColor: 'rgba(81,239,76, 0.2)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.2


                        },
                    ]

                }
            })
        });
});