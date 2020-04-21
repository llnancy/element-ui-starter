<template>
    <div>
        <img src="../../assets/logo.png">
        <el-row>
            <el-button type="warning" @click="handleAddDeleteSelect()">Select选择器动态增删</el-button>
            <el-button type="warning" @click="handleEchoDataSelect()">Select选择器数据回显</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        methods: {
            handleAddDeleteSelect () {
                this.$router.push({
                    path: '/selector/addDelete'
                });
            },
            handleEchoDataSelect () {
                this.$router.push({
                    path: '/selector/echoData'
                });
            },
        }
    }
</script>