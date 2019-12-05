import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';


const stateInicial = {
    cita : { 
    paciente : '',
    dni : '',
    fecha : '', 
    hora: '',
    sintomas: ''
},
error: false 
} 

class NuevaCita extends Component {
    state = {...stateInicial}

    handleChange = e => {
        console.log(e.target.name + ': ' + e.target.value);

        this.setState({
            cita : {
                ...this.state.cita,
                [e.target.name] : e.target.value
            }
        })
    }

        handleSubmit = e =>{
        e.preventDefault();

        const {paciente, dni, fecha, hora, sintomas} = this.state.cita;

        if(paciente === '' || dni === '' || fecha === '' || hora === '' || sintomas === '' ) {
            this.setState({
                error: true
            });

            return;
        }

        const nuevaCita = {...this.state.cita}
        nuevaCita.id = uuid();

        this.props.crearNuevaCita(nuevaCita)

        this.setState({
            ...stateInicial
        })

        }

    render (){

        const { error } = this.state;

        return (
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        Llena el formulario para crear una nueva cita
                    </h2>
                    {error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos los campos son obligatorios</div> : null }

                        <form 
                            onSubmit={this.handleSubmit}
                        >
                            <div className="form-group row">
                                <label className="col-sm-4 col-lg-2 col-form-label">
                                    Paciente:</label>
                                    <div className="col-sm-8 col-lg-10">
                                        <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del paciente"
                                        name="paciente"
                                        onChange={this.handleChange}
                                        value={this.state.cita.paciente}
                                        />
                                    </div>
                            </div>
                            
                            <div className="form-group row">
                                <label className="col-sm-4 col-lg-2 col-form-label">
                                    D.N.I:</label>
                                    <div className="col-sm-8 col-lg-10">
                                        <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Número de documento"
                                        name="dni"
                                        onChange={this.handleChange}
                                        value={this.state.cita.dni}
                                        />
                                    </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-lg-2 col-form-label">
                                    Fecha: </label>
                                    <div className="col-sm-8 col-lg-4">
                                        <input 
                                        type="date"
                                        className="form-control"
                                        name="fecha"
                                        onChange={this.handleChange}
                                        value={this.state.cita.fecha}
                                        />
                                    </div>
                           
                            
                           
                                <label className="col-sm-4 col-lg-2 col-form-label">
                                    Hora: </label>
                                    <div className="col-sm-8 col-lg-4">
                                        <input 
                                        type="time"
                                        className="form-control"
                                        name="hora"
                                        onChange={this.handleChange}
                                        value={this.state.cita.hora}
                                        />
                                    </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-lg-2 col-form-label">
                                    Sintomas: </label>
                                    <div className="col-sm-8 col-lg-10">
                                        <textarea
                                        className="form-control"
                                        name="sintomas"
                                        placeholder="Describe los sintomas."
                                        onChange={this.handleChange}
                                        value={this.state.cita.sintomas}
                                        ></textarea>
                                        
                                    </div>
                            </div>
                        
                        <input type="submit" className="py3 mt-2 btn btn-success btn-block" value="Agregar nueva cita"/>
                            
                        </form>
            
                    </div>
                </div>

          
        );
    }
}

NuevaCita.propTypes = {
    crearNuevaCita : PropTypes.func.isRequired
}

export default NuevaCita;