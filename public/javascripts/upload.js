$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){

    const uploadMode = document.getElementById('uploadMode').innerHTML;
    var files = $(this).get(0).files;
    let initialTime = 0;
    let projectName;
    let projectDescription;
    setTimeout(() => {
      console.log('uploadMode: ', uploadMode);
      if (uploadMode == 'create') {
        console.log('=======inside==============');
        projectName = document.getElementById('projectName').value;
        projectDescription = document.getElementById('projectDescription').value;
      } else {
        console.log('------------outside----------------');
        projectName = document.getElementById('projectName').innerText;
        projectDescription = document.getElementById('projectDescription').innerText;
        initialTime = document.getElementById('initial-time').value;
      }
      if (files.length > 0) { // ??? may need to just change to one
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        formData.append('uploadMode', uploadMode);
        formData.append('projectName', projectName);
        formData.append('projectDescription', projectDescription);
        formData.append('initialTime', initialTime);

        console.log('projectName: ', projectName);
        console.log('projectDescription: ', projectDescription);

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
    }, 2500);

});
