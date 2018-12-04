<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>-->
    <script src="/js/plugins/jspdf.min.js"></script>
    <link href="main.css" rel="stylesheet"></link>
    <script src="main.js"></script>
  </head>
  <body>

    <div class="modal fade edit-menu-modu">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">EDYTOR SUPERKLASY</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="edit-menu-box" data-section="" data-xcoord="" data-ycoord="">
              <h1>Dodatkowe punkty</h1>
              <h4>Aktualna klasa: <span class="class-name"></span></h4>
              <div class="edit-menu-interface">
                <p></p>
                <input data-active="0" data-value="" type=""><br>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary save-me-very">zapisz</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <main class="container-fluid">
      <div class="row">
        <h1 class="col-9">superklasa 2018</h1>
        <div class="col-3">
          <button class="nav-table-button">tabela</button>
          <button class="nav-raport-button">raport</button>
          <a id="save-me-very-much" download="backup-superclass.json"><button>Zapisz do pliku</button></a>
          <input type='file' accept='text/plain' onchange='openFile(event)'>
        </div>
      </div>
      <article>

      </article>
      <article class="all-classes-view">
        <div class="overflow-y">
          <table class="table table-striped table-bordered table-hover">
            <thead class="su-table-header">

            </thead>
            <tbody class="su-table-body">

            </tbody>
          </table>
        </div>
      </article>
      <article class="class-view-window hide-me" data-xcoord="" data-ycoord="">
        <h3 class="main-class-name"></h3>
        <div class="row">
          <div class="col-9">
            <button class="btn btn-primary class-view-option" data-option="presence">obecność</button>
            <button class="btn btn-secondary class-view-option" data-option="marks">oceny</button>
            <button class="btn btn-primary class-view-option" data-option="competitions">zawody</button>
            <button class="btn btn-secondary class-view-option" data-option="extras">dodakowe</button>
            <button class="btn btn-primary class-view-option" data-option="reading">czytelnictwo</button>
            <button class="btn btn-primary class-view-option" data-option="presence-semester">obecność semestralna</button>
            <div class="class-view-scores overflow-y unoverflow-x">

            </div>
          </div>
          <div class="col-3 ">
            <div class=" class-mini-list overflow-y">

            </div>
          </div>
        </div>
      </article>
      <article class="print-view hide-me">

      </article>
      <article class="settings hide-me">

      </article>
    </main>
  </body>
</html>
