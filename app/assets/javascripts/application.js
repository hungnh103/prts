// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require cable
//= require_tree ./admin

$(document).on('ready', function(){
  $('.flash-message').delay(3000).slideUp(500, function(){
    $(this).remove();
  });

  $('body').on('click', '.pull-status span.ready', function() {
    if(confirm('Are you sure?') == false) return false;
    var spanElem = $(this);
    var tdElem = spanElem.parents('.pull-status');
    var form = spanElem.parents('form');
    var tr = form.parents('td').parents('tr');
    var current_reviewer = tr.children('td.current-reviewer');

    $.ajax({
      url: form[0].action,
      type: 'POST',
      dataType: 'json',
      data: form.serialize(),
      success: function (data) {
        tdElem.html('<span class="' + data.status + '">' + data.status + '</span>');
        current_reviewer.removeClass('text-center');
        current_reviewer.html(data.current_reviewer);
        var win = window.open(data.url_files, '_blank');
        win.focus();
      },
      errors: function() {
        alert('Update failed!!!');
      }
    });
  });

  $('body').on('change', '.office-classification', function(){
    $(this).closest('form').submit();
  })

  $('body').on('click', '.pull-request-status-label label[role=button]', function(e){
    // var label_name = $(this).attr('for');
    // var checkbox = $(this).children('input');
    // var checkbox_status = checkbox.prop('checked');

    // sessionStorage.setItem('label_name', label_name);
    // if(checkbox_status) {
    //   // checkbox.attr('checked', 'checked');
    //   sessionStorage.setItem('status', 'checked');
    // } else {
    //   // checkbox.removeAttr('checked');
    //   sessionStorage.setItem('status', 'unchecked');
    // }

    $(this).closest('form').submit();
  })
})
