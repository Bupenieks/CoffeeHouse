$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){

    var files = $(this).get(0).files;
    console.log('$(this).get: ', $(this).get(0));
    // const projectName = document.getElementById('projectName').value;
    // console.log('email input loading: ', projectName);
    // const projectDescription = document.getElementById('projectDescription').value;
    // console.log('description input loading: ', projectDescription);
    // console.log('on upload input change files:', files);
    // console.log('files.length: ', files.length);
    if (files.length > 0){ // ??? may need to just change to one
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log('file in looping through files: ', file);

            // add the files to formData object for the data payload
            formData.append('uploads[]', file, file.name);
        }

        console.log('-----formData: ', formData);
        // url: '/upload?uploadType=new&userId=user1&repoId=repoId',

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
                console.log('upload successful!\n' + data);
            },
            xhr: function() {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();

                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function(evt) {

                    if (evt.lengthComputable) {
                        // calculate the percentage of upload completed
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);

                        // update the Bootstrap progress bar with the new percentage
                        $('.progress-bar').text(percentComplete + '%');
                        $('.progress-bar').width(percentComplete + '%');

                        // once the upload reaches 100%, set the progress bar text to done
                        if (percentComplete === 100) {
                            $('.progress-bar').html('Done');
                        }

                    }

                }, false);

                console.log('formData: ', formData);

                return xhr;
            }
        });

    }
});
