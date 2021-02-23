var global_pid = "";

var hahaOCR = hahaOCR || {};

hahaOCR.prototype={
    init:function(){
        $("#optionPage").click(function() {
            event.preventDefault();
            window.close();
        });
        //给所有图片,带有clicker的全部加上鼠标滑动事件和点击事件
        $('body').on('.clicker', function() {
            var img_url = $(this).parent().nextAll().find('#res_img').data('url');

            if (img_url != '' && img_url != undefined && $(this).attr('data-url') != 1) {
                $(this).prop('src', img_url);
                $(this).attr('data-url', 1);
            }
        }).on("click", '.clicker', function() {
            $('#input').trigger('click');
        });


        $("body").on({
            dragleave: function(e) {
                e.preventDefault();
                // e.stopPropagation();
            },
            drop: function(e) {
                e.preventDefault();
                // e.stopPropagation();
            },
            dragenter: function(e) {
                e.preventDefault();
                // e.stopPropagation();
            },
            dragover: function(e) {
                e.preventDefault();
                // e.stopPropagation();
            }
        });

        //exit with ESC press
        $(document).keydown(function(event) {
            if (event.keyCode == 27) {
                window.close();
            }
        });


        //此处是手动选择文件
        $('#input').change(function() {
            event.preventDefault();
            var filesToUpload = document.getElementById('input').files;
            var img_file = [];
            for (var i = 0; i < filesToUpload.length; i++) {
                var file = filesToUpload[i];
                if (/image\/\w+/.test(file.type) && file != "undefined") {
                    img_file.push(file);
                }
            }
            var reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var imgUrlBase64;
            if (img_file) {
                //将文件以Data URL形式读入页面
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                        alert( '上传失败，请上传不大于2M的图片！');
                        return;
                    }else{
                        $.ajax({
                            type: 'post',
                            url: 'http://route.showapi.com/1274-2',
                            dataType: 'json',
                            data: {
                                "showapi_appid": '454633', //这里需要改成自己的appid
                                "showapi_sign": '9100c8dfb9444c0bae8726c1e53764c0',  //这里需要改成自己的应用的密钥secret
                                "base64":reader.result,
                            },
                            error: function(XmlHttpRequest, textStatus, errorThrown) {
                                alert("操作失败!");
                            },
                            success: function(result) {
                                var res = result.showapi_res_body.texts[0];
                                console.log(res)
                                $("#exampleFormControlTextarea1").val(res)
                            }
                        });
                    }
                }
            }
            hahaOCR.prototype.getImageFile(img_file, filesToUpload.length);
        });

        $("body").on('drop', function(e) {
            e.preventDefault(); //取消默认浏览器拖拽效果
            var fileList = e.originalEvent.dataTransfer.files; //获取文件对象
            var img_file = [];
            for (var i = 0; i < fileList.length; i++) {
                var file = fileList[i];
                if (fileList[0].type.indexOf('image') !== -1 && fileList[0] != "undefined") {
                    img_file.push(file);
                }
            }
            var reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var imgUrlBase64;
            if (img_file) {
                //将文件以Data URL形式读入页面
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                        alert( '上传失败，请上传不大于2M的图片！');
                        return;
                    }else{
                        $.ajax({
                            type: 'post',
                            url: 'http://route.showapi.com/1274-2',
                            dataType: 'json',
                            data: {
                                "showapi_appid": '454633', //这里需要改成自己的appid
                                "showapi_sign": '9100c8dfb9444c0bae8726c1e53764c0',  //这里需要改成自己的应用的密钥secret
                                "base64":reader.result,
                            },
                            error: function(XmlHttpRequest, textStatus, errorThrown) {
                                alert("操作失败!");
                            },
                            success: function(result) {
                                var res = result.showapi_res_body.texts[0]
                                $("#exampleFormControlTextarea1").val(res)
                            }
                        });
                    }
                }
            }

            hahaOCR.prototype.getImageFile(img_file, fileList.length);
        });

    },
    //上传完成或者出错时的处理
    uploadFinishEvent: function() {
        $('#uploadPlaceHolder').prop('src', '1x1.png');
        $('.clicker').css('border', 'none').css('background-color', 'transparent').css('box-shadow','none');
    },


    getImageFile: function(img_file, flag) {

        if (img_file.length > 0 && ($('.clicker:first').attr('src') != 'placeholder.png' || $('.clicker:last').attr('src') != 'placeholder2.png')) {
            hahaOCR.prototype.clearData();
        }

        for (var i = 0; i < img_file.length; i++) {
            var file = img_file[i];
            hahaOCR.prototype.previewAndUpload(file, i);
        }
        //检测文件是不是图片
        if (img_file.length < 1 && flag) {
            swal("请重新输入图片~");
            return false;
        }
    },
    //预览和上传
    previewAndUpload: function(file, i) {
        hahaOCR.prototype.uploadFinishEvent();
        $(".loader-wrap").show();
        var reader = new FileReader();
        var imgFile;
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            if (hahaOCR.prototype.is_batch != 1) {
                $('.single-model img').prop('src', '1x1.png');
                $('.single-model img').css('background-image', 'url(' + this.result + ')');
                $('.single-model img').css('background-position', 'center');
                $('.file-info').css('display', 'inline-block');
                if (file.name.length > 30) {
                    $("#fileName").text(file.name.substring(0, 8) + "..." + file.name.substring(file.name.length - 8, file.name.length));
                } else {
                    $("#fileName").text(file.name);
                }
                $("#fileSize").text((e.total / 1024).toFixed(2) + " kb");
            } else {
                $('#pic' + i).prop('src', '1x1.png');
                $('#pic' + i).css('background-image', 'url(' + this.result + ')');
                $('#pic' + i).css('background-position', 'center');
            }
        };
        reader.onloadend = function(e) {
            $(".loader-wrap").fadeOut("fast");
            imgFile = e.target;
            var acceptType = imgFile.result.split(';')[0].toLowerCase();
            var base64 = imgFile.result.split(',')[1];
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function() { hahaOCR.prototype.updateProgress(event, i) });
            hahaOCR.prototype.xhr_arr.push(xhr); //保存xhr对象
            hahaOCR.prototype.pic_num++; //计数
            var data = new FormData();
            data.append('b64_data', base64);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var resText = xhr.responseText;
                        var splitIndex, rs, pid, params;

                            splitIndex = resText.indexOf('{"');
                            rs = JSON.parse(resText.substring(splitIndex));
                            pid = rs.data.pics.pic_1.pid;
                            ret = rs.data.pics.pic_1.ret;
                            if(ret == 1){
                                //获取成功
                                global_pid = pid;
                                params = {
                                    pid: pid,
                                    ext: acceptType == 'data:image/gif' ? '.gif' : '.jpg',
                                    pic_name: file.name
                                };


                                if (--hahaOCR.prototype.pic_num == 0) { //如果图片数递减至0,说明所有图片上传完成
                                    hahaOCR.prototype.toggleBtn(1);
                                }
                                $('#pic' + i).nextAll('.progress').hide();
                                $('#pic' + i).nextAll('.input-append').show();
                                return true;
                            }

                    }
                }
            };
            xhr.open('POST', 'https://picupload.weibo.com/interface/pic_upload.php?ori=1&mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog');
            xhr.send(data);
        };
    },
    updateProgress: function(evt, i) {
        $('#single-progress').css('display', 'block');
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            // $('#pic0').nextAll('.progress').attr('width',percentComplete*100+"%");
            $('#pic' + i).nextAll('.progress').children('.progress-bar').css('width', percentComplete * 100 + "%");

            // hack 检测是否是单图模式
            if($('.single-model:visible')[0]) {
                $('#single-progress').children('.progress-bar').css('width', percentComplete * 100 + "%");
            }
        } else {
            //如果无法计算就给个假的进度条
            $('#pic' + i).nextAll('.progress').children('.progress-bar').css('width', "60%");

        }
    },
    //清空之前的上传数据
    clearData: function() {
        //清空图片的style
        $('.clicker').removeAttr('style');
        hahaOCR.prototype.xhr_arr = []; //清空xhr的值
        global_pid = '';
    }
};

$(function() {
    my = hahaOCR.prototype;
    my.init();
});
