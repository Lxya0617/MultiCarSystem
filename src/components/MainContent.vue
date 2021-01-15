<template>
    <div class="layout" >
        <Layout class="ivu-layout-has-sider" :style="{minHeight: '100vh'}">
            <Aside class="ivu-layout-sider" ></Aside>  
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                    <div class="logout">
                        <Icon style="transform: rotate(90deg)" type="ios-share-outline" /><span @click='logout'>注销</span>
                    </div>
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <!-- <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem> -->
                    </Breadcrumb>
                    <Card class="main">
                        <!-- <div style="height: 600px">Content</div> -->
                        <router-view></router-view>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import Aside from './Aside'
    export default {
        data () {
            return {
                isCollapsed: false
            };
        },
        components:{Aside},
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods:{
            logout(){
                this.$router.push({path:'/login'})
                // this.$router.push({path:'/maincontent'})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .logout{
        display: flex;
        height: 100%;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        line-height: 64px;
        i{
            font-size: 22px;
            float: left;
        }
        span{
            float: left;
            font-size: 16px;
            line-height: 22px;
            cursor: pointer;
            &:hover{
                color:rgb(87, 163, 243);
                font-weight: 600;
            }
        }
    }
    // .main{
    //     height: 1000px;
    // }
</style>
