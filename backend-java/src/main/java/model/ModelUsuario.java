package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import conector.MySql;
import entidades.usuario;

public class ModelUsuario {
public usuario iniciarSesion(String login, String pass ) {
	usuario usu = null;
	String sql = "Select * from tbUsuario where usuario=? AND pass=?";
	try (
		Connection con = MySql.getConexion();
		PreparedStatement pstm = con.prepareStatement(sql);
			){
		pstm.setString(1, login);
		pstm.setString(2, pass);	
		try(ResultSet rs = pstm.executeQuery()){
			if (rs.next()) {
			usu = new usuario();
			usu.setUsuario(rs.getString("usuario"));
			usu.setCorreo(rs.getString("correo"));
			usu.setCargo(rs.getString("cargo"));
			usu.setDescripcion(rs.getString("descripcion"));
	}}} 
			catch (Exception e) {
			e.printStackTrace();
			System.out.println("error en el inicio conector");
	}return usu;

}
}
