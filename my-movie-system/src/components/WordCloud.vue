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

const chartRef = ref(null);
let myChart = null; // 声明一个变量来存储图表实例

const wordCloudData = ref([
  { name: '科幻', value: 100 },
  { name: '动作', value: 85 },
  { name: '喜剧', value: 70 },
  { name: '悬疑', value: 60 },
  { name: '冒险', value: 55 },
  { name: '爱情', value: 45 },
  { name: '动画', value: 40 },
  { name: '剧情', value: 35 },
  { name: '犯罪', value: 30 },
  { name: '历史', value: 25 },
  { name: '魔幻', value: 20 },
  { name: '奇幻', value: 18 },
  { name: '文艺', value: 15 },
  { name: '经典', value: 12 },
  { name: '青春', value: 10 },
  { name: '战争', value: 8 },
]);

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    const option = {
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          sizeRange: [12, 40], // 缩小词语大小范围，让整体更紧凑
          rotationRange: [0, 0], // **关键修改：将旋转角度范围设为0，保持水平**
          gridSize: 10,
          layoutAnimation: true, // 开启布局动画
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: '#fff', // **关键修改：固定颜色为白色，而非随机色**
          },
          // 优化：使用不同的颜色，但不是随机的，而是从一个调色板中选择
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#fff',
            },
          },
          data: wordCloudData.value,
        },
      ],
    };

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
    option.series[0].data = dataWithColors;

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
  }
});

// 在组件卸载时销毁图表实例，防止内存泄漏
onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
  }
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