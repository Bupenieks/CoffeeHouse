$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){

    var files = $(this).get(0).files;
    const uploadMode = document.getElementById('uploadMode').innerHTML;
    let initialTime = 0;

    if (uploadMode === 'create') {
      const projectName = document.getElementById('projectName').value;
      const projectDescription = document.getElementById('projectDescription').value;
    } else {
      const projectName = document.getElementById('projectName').innerText;
      const projectDescription = document.getElementById('projectDescription').innerText;
      initialTime = document.getElementById('initial-time').value;
    }

    if (files.length > 0){ // ??? may need to just change to one
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        if (uploadMode !== 'create') {
          // grab the initial time value for the upload and add to formData
        }

        formData.append('projectName', projectName.innerHTML);
        formData.append('projectDescription', projectDescription.innerHTML);
        formData.append('initialTime', initialTime);

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // add the files to formData object for the data payload
            formData.append('uploads[]', file, file.name);
        }

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

                return xhr;
            }
        });

    }
});
