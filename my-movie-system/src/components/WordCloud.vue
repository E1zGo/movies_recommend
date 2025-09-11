<template>
  <div class="word-cloud-container">
    <h2 class="section-title">猜你喜欢</h2>
    <div ref="chartRef" class="word-cloud-chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import axios from 'axios';

const chartRef = ref(null);
let myChart = null; // 声明一个变量来存储图表实例
const wordCloudData = ref([]); // 动态数据源
const isLoading = ref(true); // 加载状态
const error = ref(null); // 错误信息

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步加载词云数据
 */
const fetchWordCloudData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        const response = await axios.get(`${API_BASE_URL}/trends/word-cloud`);
        wordCloudData.value = response.data.data || [];
        // 在数据加载成功后，渲染图表
        renderChart();
    } catch (err) {
        console.error('加载词云数据失败:', err);
        error.value = '无法加载词云，请稍后再试。';
    } finally {
        isLoading.value = false;
    }
};

/**
 * 渲染 ECharts 词云图
 */
const renderChart = () => {
    if (!chartRef.value || !wordCloudData.value.length) {
        return;
    }

    if (!myChart) {
        myChart = echarts.init(chartRef.value);
    }
    
    // 为不同热度的词语设置不同颜色
    const colors = ['#e50914', '#f58220', '#66c04f', '#4285f4'];
    const dataWithColors = wordCloudData.value.map(item => {
        let color = colors[3]; // 默认颜色
        if (item.value >= 70) {
            color = colors[0]; // 热度高用电影红
        } else if (item.value >= 50) {
            color = colors[1];
        } else if (item.value >= 30) {
            color = colors[2];
        }
        return {
            ...item,
            textStyle: {
                color: color,
            },
        };
    });

    const option = {
        series: [
            {
                type: 'wordCloud',
                shape: 'circle',
                sizeRange: [12, 40],
                rotationRange: [0, 0],
                gridSize: 10,
                layoutAnimation: true,
                textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                },
                emphasis: {
                    focus: 'self',
                    textStyle: {
                        shadowBlur: 10,
                        shadowColor: '#fff',
                    },
                },
                data: dataWithColors, // 使用带有颜色的动态数据
            },
        ],
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
};

onMounted(() => {
    fetchWordCloudData();
});

onUnmounted(() => {
    if (myChart) {
        myChart.dispose();
        myChart = null;
    }
    window.removeEventListener('resize', () => myChart.resize());
});
</script>

<style scoped>
.word-cloud-container {
  width: 100%;
  margin-top: 30px; /* 调整与上方模块的间距 */
  padding: 20px; /* 减小内边距 */
  text-align: center;
  background-color: #2b2b2b;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.section-title {
  font-size: 24px; /* 减小标题字体 */
  font-weight: 400;
  color: #e50914;
  margin-bottom: 15px; /* 减小标题与图表的间距 */
}

.word-cloud-chart {
  width: 100%;
  height: 250px; /* 减小图表高度，让整个模块更小 */
}
</style>