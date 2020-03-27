<script>
    let active = false;
    let addActive = () => {
        active = active === false ? true : false;
    }
</script>

<button class="{active ? 'active' : ''}" on:click={addActive}><div class="cheese"></div></button>


<style lang="scss">
    button{
        position: relative;
        display: flex;
        width: 100px;
        height: 100px;
        padding: 0.5em;
        transition: 0.25s;
        overflow: hidden;
        border: none;
        .cheese{
            top: 0;
            bottom: 0;
            &:after{
                position: absolute;
                content: '';
                background: white;
                height: 2px;
                width: 0;
                left: 0;
                right: 0;
                margin: auto;
                transition: 0.5s;
            }
        }
        .cheese, &:before, &:after{
            position: absolute;
            content: '';
            height: 2px;
            width: 80%;
            margin: auto;
            left: 0;
            right: 0;
            background: black;
            transition: 0.25s;
        }
        &:before{
            top: 20%;
        }
        &:after{
            bottom: 20%;
        }
        &.active{
            transform: translateZ(0) rotate(-180deg);
            border-radius: 100px;
            border: 1px solid black;
            &:before{
                top: -5%;
            }
            &:after{
                bottom: -5%;
            }
            .cheese{
                width: 100%;
                &:after{
                    width: 100%;
                }
            }
        }
    }
</style>