<template>
    <div>
        <el-form :model="form">
            <el-form-item
                    v-for="(groupId,index) in initGroupDataList"
                    label="分组名称"
                    :key="groupId.key"
                    :prop="groupId.value"
            >
                <el-select v-model="form.groupList[index]" @change="changeGroupSelect($event,index)" no-data-text="暂无有效的分组" filterable placeholder="请选择分组">
                    <el-option
                            v-for="group in groupDataList"
                            :key="group.groupId"
                            :label="group.groupName"
                            :value="group.groupId"
                            :disabled="group.disabled"
                    >
                    </el-option>
                </el-select>
                <el-button type="primary" v-if="index === 0" @click="addGroup()">新增分组</el-button>
                <el-button type="danger" v-if="index !== 0" @click.prevent="deleteGroupSelect(groupId,index)">删除分组</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    groupList: [
                    ],
                },
                // 下拉框个数数据：有几个元素则显示几个下拉框
                initGroupDataList: [],
                // 分组数组，下拉框的option数据
                groupDataList: [
                    {'groupId': '449932799145345023','groupName': '分组1','disabled': false},
                    {'groupId': '449932799145345022','groupName': '分组2','disabled': false},
                    {'groupId': '449932799145345021','groupName': '分组3','disabled': false},
                    {'groupId': '449932799145345020','groupName': '分组4','disabled': false},
                ],
                // 已选中的下拉框数据
                selectedGroupDataList: [],
            }
        },
        created() {
            let params = this.$route.params;
            if (params.action === 'addDelete') {
                // 动态增删select
                // 初始化一个下拉框
                this.initGroupDataList.push({
                    value: '1',
                    key: Date.now()
                });
            } else if (params.action === 'echoData') {
                let length = 3;
                for (let i = 0; i < length; i++) {
                    // 初始化length个下拉框
                    this.initGroupDataList.push({
                        value: i.toString(),
                        key: Date.now() + Math.random()
                    });
                    // 数据回显 用push的方式无法实现
                    // this.form.groupList.push({
                    //     value: '449932799145345024',
                    //     key: Date.now()
                    // })
                    this.form.groupList[i] = '44993279914534502' + i;
                }
            }
        },
        methods: {
            /**
             * @param event 当前下拉框选中值，event自动传递，groupId分组id，此处传递其它值好像无法实现功能
             * @param index 当前下拉框索引，是第几个下拉框
             **/
            changeGroupSelect(event,index) {
                let _this = this;
                // 旧的选中项 第一次选择，旧的值为undefined，
                let oldSelectedGroupId = _this.selectedGroupDataList[index];
                // 新的选中项
                _this.selectedGroupDataList[index] = event;
                for (let i = 0; i < _this.groupDataList.length; i++) {
                    for (let j = 0; j < _this.selectedGroupDataList.length; j++) {
                        if (oldSelectedGroupId !== null && oldSelectedGroupId !== '' && oldSelectedGroupId !== undefined) {
                            // 旧的选中值存在，则将旧的选中值设为可选
                            if (_this.groupDataList[i].groupId === oldSelectedGroupId) {
                                _this.groupDataList[i].disabled = false;
                            }
                        }
                        // 将新的选中值设为禁用
                        if (_this.groupDataList[i].groupId === event) {
                            _this.groupDataList[i].disabled = true;
                        }
                    }
                }
            },
            addGroup() {
                let _this = this;
                let length = _this.initGroupDataList.length;
                let groupDataListElement = _this.groupDataList[Number(length)];
                if (groupDataListElement === undefined) {
                    _this.$message.error('没有更多的分组了~');
                    return;
                }
                _this.initGroupDataList.push({
                    value: groupDataListElement.groupId,
                    key: Date.now()
                });
            },
            deleteGroupSelect(groupId,index) {
                let _this = this;
                let indexOf = _this.initGroupDataList.indexOf(groupId);
                if (indexOf !== -1) {
                    _this.initGroupDataList.splice(indexOf,1);
                }
                // 当前下拉框选中值
                let selectedValue = _this.selectedGroupDataList[index];
                if (selectedValue !== null && selectedValue !== '' && selectedValue !== undefined) {
                    for (let i = 0; i < _this.groupDataList.length; i++) {
                        // 将当前被删除的下拉框选中的值设为可选
                        if (_this.groupDataList[i].groupId === selectedValue) {
                            _this.groupDataList[i].disabled = false;
                            // 选中的数据域删除
                            let selectedIndex = _this.selectedGroupDataList.indexOf(groupId);
                            _this.selectedGroupDataList.splice(selectedIndex,1);
                            return;
                        }
                    }
                }
            },
        }
    };
</script>