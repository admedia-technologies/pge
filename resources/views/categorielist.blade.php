@extends('layouts.app')

@section('content') 
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header row"><div class="col-md-5">{{ __('Users List') }}</div><div class="col-md-3"><button class="btn btn-success btn-block" data-toggle="modal" data-target="#modal">Ajouter un utilisateur</button></div> </div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif


                    <table class="table table-bordered" id="categories">
                    <thead>
                        <tr>
                        <th scope="col">S#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>

                        </tr>
                    </thead>

                    <tbody>
                        @foreach ($categories as $val)
                        <tr role="row" class="odd">
                            <td class="sorting_1">{{ $val->id}}</td>
                            <td>{{ $val->location_type}}</td>
                            <td>
                                <button class="btn btn-icon btn-rounded btn-light" title="Modifier" data-toggle="modal" data-target="#modal-edit" val="{{ $val->location_type}}" value="{{ $val->id}}" onclick="fill_categorie(this)">
                                    <svg class="svg-inline--fa fa-edit fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                        <path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                                    </svg>
                                    <!-- <i class="fas fa-edit"></i> Font Awesome fontawesome.com -->
                                </button>
                                <a href="http://127.0.0.1:8000/categorie/remove/{{$val->id}}" class="btn btn-icon btn-rounded btn-light" title="Supprimer" id="Êtes-vous sûr de vouloir supprimer cette catégorie?" onclick="return confirm(this.id)">
                                    <svg class="svg-inline--fa fa-trash fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                        <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                                    </svg>
                                    <!-- <i class="fas fa-trash"></i> Font Awesome fontawesome.com -->
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>

                    </table>

                </div>
            </div>
        </div>
    </div>
</div>

<!-- / .modal -->
<div id="modal" class="modal fade" data-backdrop="true" aria-hidden="true" style="display: none;">
    <div class="modal-dialog ">
        <div class="modal-content ">
            <div class="modal-header ">
                <div class="modal-title text-md">Veuillez entrer les informations de l'utilisateur</div>
            </div>
            <div class="modal-body">
                <div class="col-md-12 text-center">
                    <small class="text-danger" id="error_field"></small>
                    <small class="text-success" id="success_field"></small>
                </div>
                <form action="" method="POST">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nom</label>
                        <div class="col-sm-10">
                            <input type="text" id="name" name="name" class="form-control">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" onclick="save_categorie()">Enregistrer</button>
            </div>
        </div>
    </div>
</div>

<div id="modal-edit" class="modal fade" data-backdrop="true" aria-hidden="true" style="display: none;">
    <div class="modal-dialog ">
        <div class="modal-content ">
            <div class="modal-header ">
                <div class="modal-title text-md">Veuillez modifier les informations de l'utilisateur à mettre à jour</div>
            </div>
            <div class="modal-body">
                <div class="col-md-12 text-center">
                    <small class="text-danger" id="e_error_field"></small>
                    <small class="text-success" id="e_success_field"></small>
                </div>
                <form action="" method="POST">
                    <input type="hidden" id="e_id" name="e_id">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nom</label>
                        <div class="col-sm-10">
                            <input type="text" id="e_name" name="e_name" class="form-control">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" onclick="edit_categorie()">Enregistrer</button>
            </div>
        </div>
    </div>
</div>
@endsection
